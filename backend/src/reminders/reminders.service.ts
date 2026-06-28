import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import {
  BookingStatus,
  NotificationType,
  Prisma,
  ReminderChannel,
  ReminderStatus,
  ReminderType,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../common/mail/mail.service';

type ReminderBooking = {
  id: string;
  userId: string;
  patientName: string;
  patientEmail: string;
  bookingDate: Date;
  bookingTime: string;
  clinicId: string;
  doctorId: string | null;
  clinic?: { name: string; address: string };
  doctor?: { name: string } | null;
};

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @Cron(process.env.REMINDER_CRON || '0 * * * *')
  async runHourlyReminder() {
    await this.runDueReminders();
  }

  async runDueReminders() {
    const now = new Date();
    const leadMinutes = this.configService.get<number>('REMINDER_LEAD_MINUTES') ?? 180;
    const until = new Date(now.getTime() + leadMinutes * 60 * 1000);

    const bookings = await this.findDueConfirmedBookings(now, until);

    for (const booking of bookings) {
      await this.processBookingReminder(booking, until);
    }

    return {
      checkedAt: now,
      until,
      processed: bookings.length,
    };
  }

  assertInternalToken(token?: string) {
    const expected = this.configService.get<string>('INTERNAL_REMINDER_TOKEN');
    if (expected && token !== expected) {
      throw new UnauthorizedException('Invalid reminder token');
    }
  }

  private async findDueConfirmedBookings(
    now: Date,
    until: Date,
  ): Promise<ReminderBooking[]> {
    const fromDate = this.toDateOnly(now);
    const toDate = this.toDateOnly(until);

    const items = await this.prisma.booking.findMany({
      where: {
        status: BookingStatus.CONFIRMED,
        bookingDate: {
          gte: fromDate,
          lte: toDate,
        },
        reminderLogs: {
          none: {
            channel: ReminderChannel.IN_WEB,
            status: ReminderStatus.SENT,
          },
        },
      },
      take: 200,
      orderBy: [{ bookingDate: 'asc' }, { bookingTime: 'asc' }],
      select: {
        id: true,
        userId: true,
        patientName: true,
        patientEmail: true,
        bookingDate: true,
        bookingTime: true,
        clinicId: true,
        doctorId: true,
      },
    });

    const activeItems = items.filter((item) => {
      const appointmentAt = this.toAppointmentDateTime(
        item.bookingDate,
        item.bookingTime,
      );
      return appointmentAt.getTime() >= now.getTime() && appointmentAt.getTime() <= until.getTime();
    });

    if (activeItems.length === 0) {
      return [];
    }

    // Resolve clinic and doctor names via batch endpoint
    const clinicIds = Array.from(new Set(activeItems.map((i) => i.clinicId)));
    const doctorIds = Array.from(
      new Set(activeItems.map((i) => i.doctorId).filter(Boolean)),
    ) as string[];

    const resolved = await this.resolveBatchInternal({ clinicIds, doctorIds });

    return activeItems.map((item) => {
      const clinic = resolved?.clinics?.[item.clinicId] || {
        name: 'Clinic',
        address: '',
      };
      const doctor =
        item.doctorId && resolved?.doctors?.[item.doctorId]
          ? resolved.doctors[item.doctorId]
          : null;
      return {
        ...item,
        clinic,
        doctor,
      };
    });
  }

  private async processBookingReminder(
    booking: ReminderBooking,
    scheduledFor: Date,
  ) {
    const appointmentAt = this.toAppointmentDateTime(
      booking.bookingDate,
      booking.bookingTime,
    );
    const appointmentLabel = this.formatAppointmentLabel(appointmentAt);
    const title = 'Nhac lich kham sap toi';
    const clinicName = booking.clinic?.name || 'Clinic';
    const body = `Ban co lich kham tai ${clinicName} luc ${appointmentLabel}.`;
    const data: Prisma.InputJsonObject = {
      bookingId: booking.id,
      appointmentAt: appointmentAt.toISOString(),
      clinicName,
    };

    try {
      await this.createNotificationInternal({
        userId: booking.userId,
        type: NotificationType.BOOKING_REMINDER,
        title,
        body,
        data,
        push: true,
        actionUrl: `/account?tab=appointments&bookingId=${booking.id}`,
      });
      await this.markReminderSent(
        booking.id,
        ReminderChannel.IN_WEB,
        scheduledFor,
      );
      await this.markReminderSent(
        booking.id,
        ReminderChannel.WEB_PUSH,
        scheduledFor,
      );
    } catch (error) {
      this.logger.warn(
        `Failed to create notification for booking ${booking.id}: ${error instanceof Error ? error.message : String(error)}`,
      );
      await this.markReminderFailed(
        booking.id,
        ReminderChannel.IN_WEB,
        scheduledFor,
        error,
      );
    }
  }

  private async markReminderSent(
    bookingId: string,
    channel: ReminderChannel,
    scheduledFor: Date,
  ) {
    return this.prisma.bookingReminderLog.upsert({
      where: {
        bookingId_channel_reminderType: {
          bookingId,
          channel,
          reminderType: ReminderType.BEFORE_APPOINTMENT,
        },
      },
      create: {
        bookingId,
        channel,
        scheduledFor,
        status: ReminderStatus.SENT,
        sentAt: new Date(),
        attemptCount: 1,
      },
      update: {
        status: ReminderStatus.SENT,
        sentAt: new Date(),
        scheduledFor,
        attemptCount: { increment: 1 },
        error: null,
      },
    });
  }

  private async markReminderFailed(
    bookingId: string,
    channel: ReminderChannel,
    scheduledFor: Date,
    error: unknown,
  ) {
    const message = error instanceof Error ? error.message : String(error);
    this.logger.warn(
      `Reminder ${channel} failed for booking ${bookingId}: ${message}`,
    );

    return this.prisma.bookingReminderLog.upsert({
      where: {
        bookingId_channel_reminderType: {
          bookingId,
          channel,
          reminderType: ReminderType.BEFORE_APPOINTMENT,
        },
      },
      create: {
        bookingId,
        channel,
        scheduledFor,
        status: ReminderStatus.FAILED,
        attemptCount: 1,
        error: message,
      },
      update: {
        status: ReminderStatus.FAILED,
        scheduledFor,
        attemptCount: { increment: 1 },
        error: message,
      },
    });
  }

  private unpack<T>(body: any): T {
    if (body && typeof body === 'object' && 'statusCode' in body && 'data' in body) {
      return body.data as T;
    }
    return body as T;
  }

  private async resolveBatchInternal(body: {
    clinicIds?: string[];
    doctorIds?: string[];
  }) {
    try {
      const adminUrl = process.env.ADMIN_SERVICE_URL || process.env.ADMIN_URL || 'http://localhost:3002';
      const res = await fetch(`${adminUrl}/v1/admin/internal/resolve-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) return null;
      return this.unpack(await res.json());
    } catch (error) {
      console.error('Error batch resolving from admin service:', error);
      return null;
    }
  }

  private async createNotificationInternal(body: {
    userId: string;
    type: string;
    title: string;
    body: string;
    data?: any;
    push?: boolean;
    actionUrl?: string;
  }) {
    try {
      const identityUrl = process.env.IDENTITY_SERVICE_URL || process.env.AUTH_URL || 'http://localhost:3001';
      const res = await fetch(`${identityUrl}/v1/notifications/internal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        console.error('Failed to create notification', await res.text());
        throw new Error('Failed to create internal notification');
      }
    } catch (error) {
      console.error('Error sending notification to identity service:', error);
      throw error;
    }
  }

  private toAppointmentDateTime(bookingDate: Date, bookingTime: string) {
    const [hoursRaw, minutesRaw] = bookingTime.split(':');
    const date = new Date(bookingDate);
    date.setHours(Number(hoursRaw), Number(minutesRaw), 0, 0);
    return date;
  }

  private toDateOnly(value: Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  private formatAppointmentLabel(value: Date) {
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(value);
  }
}
