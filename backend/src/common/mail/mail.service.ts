import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendRegisterOtp(
    email: string,
    otp: string,
    expiresInSeconds: number,
  ): Promise<void> {
    return this.sendOtpEmail({
      email,
      otp,
      expiresInSeconds,
      subject: 'HEALTHCARE verification code',
      textTemplate: (code, expiresInMinutes) =>
        `Your verification code is ${code}. It expires in ${expiresInMinutes} minutes.`,
      htmlTemplate: (code, expiresInMinutes) =>
        `<p>Your HEALTHCARE verification code is <b>${code}</b>.</p><p>This code expires in ${expiresInMinutes} minutes.</p>`,
      logLabel: 'register OTP',
    });
  }

  async sendPasswordResetEmail(
    email: string,
    resetUrl: string,
    expiresInSeconds: number,
  ): Promise<void> {
    const smtp = this.getSmtpConfig();

    try {
      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.port === 465,
        auth: smtp.auth,
      });

      const expiresInMinutes = Math.ceil(expiresInSeconds / 60);

      await transporter.sendMail({
        from: smtp.from,
        to: email,
        subject: 'HEALTHCARE password reset request',
        text: `A password reset was requested for your HEALTHCARE account. Use this link to reset your password: ${resetUrl}. This link expires in ${expiresInMinutes} minutes.`,
        html: `<p>A password reset was requested for your HEALTHCARE account.</p><p><a href="${resetUrl}">Reset password</a></p><p>This link expires in ${expiresInMinutes} minutes.</p>`,
      });
    } catch (error) {
      this.logger.error(
        `Failed to send password reset email to ${email}: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new InternalServerErrorException('Failed to send reset email');
    }
  }

  async sendBookingConfirmedEmail(params: {
    email: string;
    patientName: string;
    clinicName: string;
    doctorName?: string | null;
    appointmentAt: string;
  }): Promise<void> {
    const doctorLine = params.doctorName
      ? `Doctor: ${params.doctorName}`
      : 'Doctor: To be updated';

    return this.sendEmail({
      to: params.email,
      subject: 'Your healthcare appointment is confirmed',
      text: [
        `Hello ${params.patientName},`,
        '',
        'Your appointment has been confirmed.',
        `Clinic: ${params.clinicName}`,
        doctorLine,
        `Time: ${params.appointmentAt}`,
        '',
        'Please arrive a little early and bring your required documents.',
      ].join('\n'),
      html: `
        <p>Hello <b>${this.escapeHtml(params.patientName)}</b>,</p>
        <p>Your appointment has been confirmed.</p>
        <ul>
          <li><b>Clinic:</b> ${this.escapeHtml(params.clinicName)}</li>
          <li><b>Doctor:</b> ${this.escapeHtml(params.doctorName || 'To be updated')}</li>
          <li><b>Time:</b> ${this.escapeHtml(params.appointmentAt)}</li>
        </ul>
        <p>Please arrive a little early and bring your required documents.</p>
      `,
      logLabel: 'booking confirmation',
    });
  }

  async sendBookingReminderEmail(params: {
    email: string;
    patientName: string;
    clinicName: string;
    doctorName?: string | null;
    appointmentAt: string;
  }): Promise<void> {
    return this.sendEmail({
      to: params.email,
      subject: 'Reminder: upcoming healthcare appointment',
      text: [
        `Hello ${params.patientName},`,
        '',
        `This is a reminder that you have an appointment at ${params.clinicName}.`,
        params.doctorName ? `Doctor: ${params.doctorName}` : undefined,
        `Time: ${params.appointmentAt}`,
        '',
        'Please arrive on time. Thank you.',
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <p>Hello <b>${this.escapeHtml(params.patientName)}</b>,</p>
        <p>This is a reminder that you have an appointment at <b>${this.escapeHtml(params.clinicName)}</b>.</p>
        <ul>
          ${
            params.doctorName
              ? `<li><b>Doctor:</b> ${this.escapeHtml(params.doctorName)}</li>`
              : ''
          }
          <li><b>Time:</b> ${this.escapeHtml(params.appointmentAt)}</li>
        </ul>
        <p>Please arrive on time. Thank you.</p>
      `,
      logLabel: 'booking reminder',
    });
  }

  private getSmtpConfig() {
    const host = this.configService.get<string>('SMTP_HOST')?.trim();
    const port = this.configService.get<number>('SMTP_PORT') ?? 587;
    const user = this.configService.get<string>('SMTP_USER')?.trim();
    const rawPass = this.configService.get<string>('SMTP_PASS');
    const pass = rawPass?.replaceAll(/\s+/g, '');
    const from = this.configService.get<string>('SMTP_FROM')?.trim();

    if (!host || !from) {
      this.logger.error('SMTP is not configured properly');
      throw new InternalServerErrorException('SMTP is not configured');
    }

    return {
      host,
      port,
      from,
      auth: user && pass ? { user, pass } : undefined,
    };
  }

  private async sendOtpEmail(params: {
    email: string;
    otp: string;
    expiresInSeconds: number;
    subject: string;
    textTemplate: (otp: string, expiresInMinutes: number) => string;
    htmlTemplate: (otp: string, expiresInMinutes: number) => string;
    logLabel: string;
  }): Promise<void> {
    const {
      email,
      otp,
      expiresInSeconds,
      subject,
      textTemplate,
      htmlTemplate,
      logLabel,
    } = params;

    const smtp = this.getSmtpConfig();

    try {
      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.port === 465,
        auth: smtp.auth,
      });

      const expiresInMinutes = Math.ceil(expiresInSeconds / 60);

      await transporter.sendMail({
        from: smtp.from,
        to: email,
        subject,
        text: textTemplate(otp, expiresInMinutes),
        html: htmlTemplate(otp, expiresInMinutes),
      });
    } catch (error) {
      this.logger.error(
        `Failed to send ${logLabel} email to ${email}: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new InternalServerErrorException('Failed to send OTP email');
    }
  }

  private async sendEmail(params: {
    to: string;
    subject: string;
    text: string;
    html: string;
    logLabel: string;
  }): Promise<void> {
    const smtp = this.getSmtpConfig();

    try {
      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.port === 465,
        auth: smtp.auth,
      });

      await transporter.sendMail({
        from: smtp.from,
        to: params.to,
        subject: params.subject,
        text: params.text,
        html: params.html,
      });
    } catch (error) {
      this.logger.error(
        `Failed to send ${params.logLabel} email to ${params.to}: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new InternalServerErrorException('Failed to send email');
    }
  }

  private escapeHtml(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
}
