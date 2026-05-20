import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @IsOptional()
  PORT: number = 8080;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  @IsOptional()
  JWT_EXPIRATION: string = '7d';

  @IsString()
  @IsOptional()
  CORS_ORIGIN: string = 'http://localhost:3000';

  @IsString()
  @IsOptional()
  REDIS_URL: string = 'redis://localhost:6379';

  @IsString()
  @IsOptional()
  SMTP_HOST: string;

  @IsNumber()
  @IsOptional()
  SMTP_PORT: number = 587;

  @IsString()
  @IsOptional()
  SMTP_USER: string;

  @IsString()
  @IsOptional()
  SMTP_PASS: string;

  @IsString()
  @IsOptional()
  SMTP_FROM: string;

  @IsNumber()
  @IsOptional()
  REGISTER_OTP_TTL_SECONDS: number = 300;

  @IsString()
  @IsOptional()
  FIREBASE_PROJECT_ID?: string;

  @IsString()
  @IsOptional()
  FIREBASE_CREDENTIAL_SOURCE?: string = 'default';

  @IsString()
  @IsOptional()
  FIREBASE_SERVICE_ACCOUNT_KEY_PATH?: string;

  @IsString()
  @IsOptional()
  FIREBASE_SERVICE_ACCOUNT_JSON?: string;

  @IsString()
  @IsOptional()
  AWS_REGION?: string = 'us-east-1';

  @IsString()
  @IsOptional()
  DYNAMODB_TABLE?: string;

  @IsString()
  @IsOptional()
  DYNAMODB_TABLE_NAME?: string;

  @IsString()
  @IsOptional()
  DYNAMODB_SYNC_ENABLED?: string = 'false';

  @IsString()
  @IsOptional()
  AWS_ACCESS_KEY_ID?: string;

  @IsString()
  @IsOptional()
  AWS_SECRET_ACCESS_KEY?: string;

  @IsString()
  @IsOptional()
  AWS_SESSION_TOKEN?: string;

  @IsString()
  @IsOptional()
  aws_access_key_id?: string;

  @IsString()
  @IsOptional()
  aws_secret_access_key?: string;

  @IsString()
  @IsOptional()
  aws_session_token?: string;
}

export function validate(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validated;
}
