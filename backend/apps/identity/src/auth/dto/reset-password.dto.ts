import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: '8a1f3d4c0e7b4a17...' })
  @IsString()
  @MinLength(32)
  @MaxLength(255)
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: 'SecurePass123!',
    minLength: 8,
    description: 'Must contain uppercase, lowercase, and number',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain uppercase, lowercase, and number',
  })
  newPassword: string;

  @ApiProperty({
    example: 'SecurePass123!',
    minLength: 8,
    description: 'Must match newPassword',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain uppercase, lowercase, and number',
  })
  confirmPassword: string;
}
