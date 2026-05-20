import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { BookingStatus } from '@prisma/client';

type DynamoBooking = {
  id: string;
  userId: string;
  clinicId: string;
  doctorId: string | null;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  bookingDate: Date;
  bookingTime: string;
  status: BookingStatus;
  clinic: { name: string };
  doctor: { name: string } | null;
};

@Injectable()
export class DynamoAppointmentsService {
  private readonly logger = new Logger(DynamoAppointmentsService.name);
  private readonly tableName?: string;
  private readonly enabled: boolean;
  private readonly docClient?: DynamoDBDocumentClient;

  constructor(private readonly configService: ConfigService) {
    this.enabled =
      this.configService.get<string>('DYNAMODB_SYNC_ENABLED') === 'true';
    this.tableName = (
      this.configService.get<string>('DYNAMODB_TABLE') ||
      this.configService.get<string>('DYNAMODB_TABLE_NAME')
    )?.trim();

    const region =
      this.configService.get<string>('AWS_REGION')?.trim() || 'us-east-1';
    const accessKeyId =
      this.configService.get<string>('AWS_ACCESS_KEY_ID') ||
      this.configService.get<string>('aws_access_key_id');
    const secretAccessKey =
      this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ||
      this.configService.get<string>('aws_secret_access_key');
    const sessionToken =
      this.configService.get<string>('AWS_SESSION_TOKEN') ||
      this.configService.get<string>('aws_session_token');
    const credentials =
      accessKeyId && secretAccessKey
        ? {
            accessKeyId,
            secretAccessKey,
            sessionToken,
          }
        : undefined;

    if (this.enabled && this.tableName) {
      this.docClient = DynamoDBDocumentClient.from(
        new DynamoDBClient({ region, credentials }),
        {
          marshallOptions: {
            removeUndefinedValues: true,
          },
        },
      );
    }
  }

  async syncConfirmedBooking(booking: DynamoBooking) {
    if (!this.canSync()) return;

    const bookingDate = this.formatDateOnly(booking.bookingDate);
    const appointmentAt = this.toAppointmentDateTime(
      booking.bookingDate,
      booking.bookingTime,
    );

    try {
      await this.docClient!.send(
        new PutCommand({
          TableName: this.tableName,
          Item: {
            appointmentId: booking.id,
            bookingId: booking.id,
            userId: booking.userId,
            status: BookingStatus.CONFIRMED,
            appointmentDate: bookingDate,
            bookingDate,
            bookingTime: booking.bookingTime,
            appointmentAt: appointmentAt.toISOString(),
            patientName: booking.patientName,
            patientEmail: booking.patientEmail,
            patientPhone: booking.patientPhone,
            clinicId: booking.clinicId,
            clinicName: booking.clinic.name,
            doctorId: booking.doctorId,
            doctorName: booking.doctor?.name,
            source: 'healthcare-backend',
            updatedAt: new Date().toISOString(),
          },
        }),
      );
      this.logger.log(
        `Synced confirmed booking ${booking.id} to DynamoDB table ${this.tableName}`,
      );
    } catch (error) {
      this.logger.warn(
        `Failed to sync confirmed booking ${booking.id} to DynamoDB: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  async syncBookingStatus(bookingId: string, status: BookingStatus) {
    if (!this.canSync()) return;

    try {
      await this.docClient!.send(
        new UpdateCommand({
          TableName: this.tableName,
          Key: { appointmentId: bookingId },
          UpdateExpression:
            'SET #status = :status, bookingId = :bookingId, source = :source, updatedAt = :updatedAt',
          ExpressionAttributeNames: {
            '#status': 'status',
          },
          ExpressionAttributeValues: {
            ':status': status,
            ':bookingId': bookingId,
            ':source': 'healthcare-backend',
            ':updatedAt': new Date().toISOString(),
          },
        }),
      );
      this.logger.log(
        `Synced booking ${bookingId} status ${status} to DynamoDB table ${this.tableName}`,
      );
    } catch (error) {
      this.logger.warn(
        `Failed to sync booking ${bookingId} status ${status} to DynamoDB: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  private canSync() {
    if (!this.enabled) {
      this.logger.debug('DynamoDB sync is disabled');
      return false;
    }

    if (!this.tableName || !this.docClient) {
      this.logger.warn(
        'DynamoDB sync is enabled but DYNAMODB_TABLE/AWS_REGION is not configured correctly',
      );
      return false;
    }

    return true;
  }

  private formatDateOnly(value: Date) {
    return value.toISOString().slice(0, 10);
  }

  private toAppointmentDateTime(bookingDate: Date, bookingTime: string) {
    const [hoursRaw, minutesRaw] = bookingTime.split(':');
    const date = new Date(bookingDate);
    date.setHours(Number(hoursRaw), Number(minutesRaw), 0, 0);
    return date;
  }
}
