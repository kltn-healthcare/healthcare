import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import {
  BookingStatus,
  NotificationType,
  Prisma,
  ReminderChannel,
  ReminderStatus,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../common/mail/mail.service';
import { NotificationsService } from '../notifications/notifications.service';

type ReminderBooking = {
  id: string;
  userId: string;
  patientName: string;
  patientEmail: string;
  bookingDate: Date;
  bookingTime: string;
  clinic: { name: string; address: string };
  doctor: { name: string } | null;
};

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly notificationsService: NotificationsService,
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
            channel: ReminderChannel.EMAIL,
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
        clinic: { select: { name: true, address: true } },
        doctor: { select: { name: true } },
      },
    });

    return items.filter((item) => {
      const appointmentAt = this.toAppointmentDateTime(
        item.bookingDate,
        item.bookingTime,
      );
      return appointmentAt.getTime() >= now.getTime() && appointmentAt.getTime() <= until.getTime();
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
    const body = `Ban co lich kham tai ${booking.clinic.name} luc ${appointmentLabel}.`;
    const data: Prisma.InputJsonObject = {
      bookingId: booking.id,
      appointmentAt: appointmentAt.toISOString(),
      clinicName: booking.clinic.name,
    };

    try {
      await this.mailService.sendBookingReminderEmail({
        email: booking.patientEmail,
        patientName: booking.patientName,
        clinicName: booking.clinic.name,
        doctorName: booking.doctor?.name,
        appointmentAt: appointmentLabel,
      });
      await this.notificationsService.markReminderSent(
        booking.id,
        ReminderChannel.EMAIL,
        scheduledFor,
      );
    } catch (error) {
      await this.notificationsService.markReminderFailed(
        booking.id,
        ReminderChannel.EMAIL,
        scheduledFor,
        error,
      );
    }

    try {
      await this.notificationsService.createNotification({
        userId: booking.userId,
        type: NotificationType.BOOKING_REMINDER,
        title,
        body,
        data,
        push: true,
        actionUrl: `/account?tab=appointments&bookingId=${booking.id}`,
      });
      await this.notificationsService.markReminderSent(
        booking.id,
        ReminderChannel.IN_WEB,
        scheduledFor,
      );
      await this.notificationsService.markReminderSent(
        booking.id,
        ReminderChannel.WEB_PUSH,
        scheduledFor,
      );
    } catch (error) {
      this.logger.warn(
        `Failed to create notification for booking ${booking.id}: ${error instanceof Error ? error.message : String(error)}`,
      );
      await this.notificationsService.markReminderFailed(
        booking.id,
        ReminderChannel.IN_WEB,
        scheduledFor,
        error,
      );
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
