import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ERROR_CODES } from '../common/constants/error-codes';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RedisService } from '../common/redis/redis.service';
import { MailService } from '../common/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { randomInt, randomBytes, createHash } from 'node:crypto';
import { VerifyRegisterOtpDto } from './dto/verify-register-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

interface PendingRegisterPayload extends RegisterDto {
  passwordHash: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();

    const existing = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });
    if (existing) {
      throw new ConflictException({
        code: ERROR_CODES.EMAIL_ALREADY_EXISTS,
        message: 'Email already exists',
      });
    }

    const otpTtlSeconds =
      this.configService.get<number>('REGISTER_OTP_TTL_SECONDS') ?? 300;
    const minResendCooldownSeconds = 60;

    const existingOtpTtl = await this.redisService.ttl(
      this.getRegisterOtpKey(normalizedEmail),
    );
    if (existingOtpTtl > 0) {
      const remainingCooldown =
        existingOtpTtl - (otpTtlSeconds - minResendCooldownSeconds);
      if (remainingCooldown > 0) {
        throw new BadRequestException({
          code: ERROR_CODES.OTP_RESEND_TOO_SOON,
          message: `OTP was already sent. Please wait ${remainingCooldown} seconds before requesting again`,
        });
      }
    }

    const otp = this.generateOtp();
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const pendingPayload: PendingRegisterPayload = {
      ...dto,
      email: normalizedEmail,
      passwordHash,
    };

    await this.redisService.set(
      this.getRegisterOtpKey(normalizedEmail),
      otp,
      otpTtlSeconds,
    );
    await this.redisService.set(
      this.getRegisterPayloadKey(normalizedEmail),
      JSON.stringify(pendingPayload),
      otpTtlSeconds,
    );

    try {
      await this.mailService.sendRegisterOtp(
        normalizedEmail,
        otp,
        otpTtlSeconds,
      );
    } catch (error) {
      await this.clearRegisterOtpCache(normalizedEmail);
      throw new InternalServerErrorException({
        code: ERROR_CODES.OTP_EMAIL_SERVICE_UNAVAILABLE,
        message: 'Email OTP service unavailable',
      });
    }

    return {
      message: 'OTP has been sent to your email',
      expiresInSeconds: otpTtlSeconds,
    };
  }

  async verifyRegisterOtp(dto: VerifyRegisterOtpDto): Promise<AuthResponseDto> {
    const email = dto.email.trim().toLowerCase();
    const otp = dto.otp.trim();

    const [cachedOtp, cachedPayload] = await Promise.all([
      this.redisService.get(this.getRegisterOtpKey(email)),
      this.redisService.get(this.getRegisterPayloadKey(email)),
    ]);

    if (!cachedOtp || cachedOtp !== otp) {
      throw new UnauthorizedException({
        code: ERROR_CODES.OTP_INVALID_OR_EXPIRED,
        message: 'OTP is invalid or expired',
      });
    }

    if (!cachedPayload) {
      throw new UnauthorizedException({
        code: ERROR_CODES.OTP_PENDING_DATA_NOT_FOUND,
        message: 'Registration session is expired. Please request OTP again',
      });
    }

    const pending = JSON.parse(cachedPayload) as PendingRegisterPayload;

    const user = await this.prisma.user.create({
      data: {
        name: pending.name,
        email: pending.email,
        phone: pending.phone,
        passwordHash: pending.passwordHash,
        emailVerified: true,
      },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });

    await this.clearRegisterOtpCache(email);

    const accessToken = await this.signAccessToken(
      user.id,
      user.email,
      user.role,
    );
    return { accessToken, user };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user)
      throw new UnauthorizedException({
        code: ERROR_CODES.INVALID_CREDENTIALS,
        message: 'Invalid credentials',
      });

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok)
      throw new UnauthorizedException({
        code: ERROR_CODES.INVALID_CREDENTIALS,
        message: 'Invalid credentials',
      });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
      select: { id: true },
    });

    const accessToken = await this.signAccessToken(
      user.id,
      user.email,
      user.role,
    );
    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  private async signAccessToken(
    userId: string,
    email: string,
    role: any,
  ): Promise<string> {
    return this.jwtService.signAsync({
      sub: userId,
      email,
      role,
    });
  }

  private generateOtp(): string {
    return randomInt(100000, 999999).toString();
  }

  private getRegisterOtpKey(email: string): string {
    return `auth:register:otp:${email}`;
  }

  private getRegisterPayloadKey(email: string): string {
    return `auth:register:payload:${email}`;
  }

  private async clearRegisterOtpCache(email: string): Promise<void> {
    await Promise.all([
      this.redisService.del(this.getRegisterOtpKey(email)),
      this.redisService.del(this.getRegisterPayloadKey(email)),
    ]);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const ttlSeconds =
      this.configService.get<number>('RESET_PASSWORD_TTL_SECONDS') ?? 300;
    const minResendCooldownSeconds = 60;

    // 1. Spam protection (cooldown check)
    const emailCooldownKey = this.getResetPasswordEmailKey(normalizedEmail);
    const existingTokenHash = await this.redisService.get(emailCooldownKey);

    if (existingTokenHash) {
      const existingTtl = await this.redisService.ttl(emailCooldownKey);
      if (existingTtl > 0) {
        const remainingCooldown = existingTtl - (ttlSeconds - minResendCooldownSeconds);
        if (remainingCooldown > 0) {
          throw new BadRequestException({
            code: ERROR_CODES.RESET_PASSWORD_COOLDOWN,
            message: `Reset link was already sent. Please wait ${remainingCooldown} seconds before requesting again`,
          });
        }
      }
    }

    // 2. Fetch user
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, email: true, isActive: true },
    });

    // 3. Silent success if user not found or inactive to prevent enumeration
    if (!user || !user.isActive) {
      return {
        message: 'If the email is valid, a reset link has been sent',
        expiresInSeconds: ttlSeconds,
      };
    }

    // 4. Generate token and hash
    const resetToken = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(resetToken).digest('hex');

    const tokenKey = this.getResetPasswordTokenKey(tokenHash);
    const resetUrl = this.buildResetPasswordUrl(resetToken);

    // 5. Clean up old token if exists
    if (existingTokenHash) {
      await this.redisService.del(this.getResetPasswordTokenKey(existingTokenHash));
    }

    // 6. Save new token & email key to Redis
    await Promise.all([
      this.redisService.set(
        tokenKey,
        JSON.stringify({ email: normalizedEmail }),
        ttlSeconds,
      ),
      this.redisService.set(emailCooldownKey, tokenHash, ttlSeconds),
    ]);

    // 7. Send email
    try {
      await this.mailService.sendPasswordResetEmail(
        normalizedEmail,
        resetUrl,
        ttlSeconds,
      );
    } catch (error) {
      await Promise.all([
        this.redisService.del(tokenKey),
        this.redisService.del(emailCooldownKey),
      ]);
      throw new InternalServerErrorException({
        code: ERROR_CODES.OTP_EMAIL_SERVICE_UNAVAILABLE,
        message: 'Email service unavailable',
      });
    }

    return {
      message: 'If the email is valid, a reset link has been sent',
      expiresInSeconds: ttlSeconds,
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const normalizedToken = dto.token.trim();

    if (!normalizedToken) {
      throw new UnauthorizedException({
        code: ERROR_CODES.RESET_PASSWORD_TOKEN_INVALID,
        message: 'Reset token is invalid or expired',
      });
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException({
        code: ERROR_CODES.RESET_PASSWORD_PASSWORD_MISMATCH,
        message: 'Passwords do not match',
      });
    }

    const tokenHash = createHash('sha256').update(normalizedToken).digest('hex');
    const tokenKey = this.getResetPasswordTokenKey(tokenHash);
    const cachedPayload = await this.redisService.get(tokenKey);

    if (!cachedPayload) {
      throw new UnauthorizedException({
        code: ERROR_CODES.RESET_PASSWORD_TOKEN_INVALID,
        message: 'Reset token is invalid or expired',
      });
    }

    const { email } = JSON.parse(cachedPayload) as { email: string };
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, isActive: true },
    });

    if (!user || !user.isActive) {
      await Promise.all([
        this.redisService.del(tokenKey),
        this.redisService.del(this.getResetPasswordEmailKey(email)),
      ]);
      throw new UnauthorizedException({
        code: ERROR_CODES.RESET_PASSWORD_TOKEN_INVALID,
        message: 'Reset token is invalid or expired',
      });
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    await Promise.all([
      this.redisService.del(tokenKey),
      this.redisService.del(this.getResetPasswordEmailKey(email)),
    ]);

    return {
      message: 'Password has been reset successfully',
    };
  }

  private getResetPasswordTokenKey(tokenHash: string): string {
    return `auth:reset:token:${tokenHash}`;
  }

  private getResetPasswordEmailKey(email: string): string {
    return `auth:reset:email:${email}`;
  }

  private buildResetPasswordUrl(token: string): string {
    const baseUrl = this.configService
      .get<string>('RESET_PASSWORD_URL')
      ?.trim() || 'http://localhost:3000/reset-password';

    const resetUrl = new URL(baseUrl);
    resetUrl.searchParams.set('token', token);
    return resetUrl.toString();
  }
}
