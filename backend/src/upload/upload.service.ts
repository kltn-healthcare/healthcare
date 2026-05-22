import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly logger = new Logger(UploadService.name);

  constructor(private readonly configService: ConfigService) {
    const accessKeyId =
      this.configService.get<string>('AWS_ACCESS_KEY_ID') ||
      this.configService.get<string>('aws_access_key_id');
    const secretAccessKey =
      this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ||
      this.configService.get<string>('aws_secret_access_key');
    const sessionToken =
      this.configService.get<string>('AWS_SESSION_TOKEN') ||
      this.configService.get<string>('aws_session_token');
    this.region = this.configService.get<string>('AWS_REGION') || 'us-east-1';
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME') || 'healthcare-clinic-bucket';
    const endpoint = this.configService.get<string>('AWS_S3_ENDPOINT');

    if (accessKeyId && secretAccessKey) {
      this.logger.log('Initializing S3 Client with provided credentials.');
      this.s3Client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId,
          secretAccessKey,
          ...(sessionToken ? { sessionToken } : {}),
        },
        ...(endpoint ? { endpoint, forcePathStyle: true } : {}),
      });
    } else {
      this.logger.warn('AWS credentials are not fully configured in environment. File uploads might fail.');
      // Fallback: We still instantiate the S3 client using default region
      this.s3Client = new S3Client({ region: this.region });
    }
  }

  async uploadFile(file: Express.Multer.File, folder = 'general'): Promise<{ url: string }> {
    const originalName = file.originalname;
    const fileExtension = originalName.substring(originalName.lastIndexOf('.'));
    const key = `${folder}/${uuidv4()}${fileExtension}`;

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      // Construct public URL
      const customEndpoint = this.configService.get<string>('AWS_S3_ENDPOINT');
      let url = '';
      if (customEndpoint) {
        // Custom S3 compatible service URL structure
        url = `${customEndpoint}/${this.bucketName}/${key}`;
      } else {
        // Standard AWS S3 URL structure
        url = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
      }

      this.logger.log(`File uploaded successfully to S3: ${url}`);
      return { url };
    } catch (error) {
      this.logger.error(`S3 Upload failed for key ${key}: ${error.message}`, error.stack);
      throw error;
    }
  }
}
