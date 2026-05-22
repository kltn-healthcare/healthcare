import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus, NotificationType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DynamoAppointmentsService } from '../aws/dynamo-appointments.service';
import { MailService } from '../common/mail/mail.service';
import { NotificationsService } from '../notifications/notifications.service';
import { QueryDoctorBookingsDto } from './dto/query-doctor-bookings.dto';
import { UpdateDoctorBookingStatusDto } from './dto/update-doctor-booking-status.dto';
import { UpsertDoctorScheduleDto } from './dto/upsert-doctor-schedule.dto';
import { UpsertDoctorServicesDto } from './dto/upsert-doctor-services.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';

type DoctorAdminSettings = {
  slotDurationMinutes?: number;
  workingHours?: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }>;
  services?: Array<{ name: string; price: number; currency: string }>;
};

@Injectable()
export class DoctorAdminService {
  private readonly logger = new Logger(DoctorAdminService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly dynamoAppointmentsService: DynamoAppointmentsService,
    private readonly mailService: MailService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async myBookings(userId: string, query: QueryDoctorBookingsDto) {
    const doctor = await this.getDoctorByUserId(userId);

    const where: Prisma.BookingWhereInput = {
      doctorId: doctor.id,
      ...(query.status ? { status: query.status } : {}),
    };

    if (query.date) {
      const from = new Date(query.date);
      if (Number.isNaN(from.getTime())) {
        throw new BadRequestException({
          code: 'INVALID_DATE',
          message: 'Invalid date',
        });
      }
      const to = new Date(from);
      to.setDate(to.getDate() + 1);
      where.bookingDate = { gte: from, lt: to };
    }

    const items = await this.prisma.booking.findMany({
      where,
      orderBy: [{ bookingDate: 'asc' }, { bookingTime: 'asc' }],
      take: 200,
      select: {
        id: true,
        status: true,
        bookingDate: true,
        bookingTime: true,
        patientName: true,
        patientEmail: true,
        patientPhone: true,
        notes: true,
        clinic: { select: { id: true, name: true, address: true } },
        createdAt: true,
      },
    });

    return { items };
  }

  async updateBookingStatus(
    userId: string,
    bookingId: string,
    dto: UpdateDoctorBookingStatusDto,
  ) {
    const doctor = await this.getDoctorByUserId(userId);

    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        userId: true,
        doctorId: true,
        status: true,
        bookingDate: true,
        bookingTime: true,
        patientName: true,
        patientEmail: true,
        patientPhone: true,
        clinicId: true,
        clinic: { select: { name: true } },
        doctor: { select: { name: true } },
      },
    });

    if (!booking || booking.doctorId !== doctor.id) {
      throw new NotFoundException({
        code: 'BOOKING_NOT_FOUND',
        message: 'Booking not found',
      });
    }

    const allowedStatuses: BookingStatus[] = [
      BookingStatus.CONFIRMED,
      BookingStatus.COMPLETED,
      BookingStatus.CANCELLED,
    ];

    if (!allowedStatuses.includes(dto.status)) {
      throw new BadRequestException({
        code: 'INVALID_BOOKING_STATUS',
        message: 'Invalid booking status',
      });
    }

    const transitionMap: Record<BookingStatus, BookingStatus[]> = {
      [BookingStatus.PENDING]: [
        BookingStatus.CONFIRMED,
        BookingStatus.CANCELLED,
      ],
      [BookingStatus.CONFIRMED]: [
        BookingStatus.COMPLETED,
        BookingStatus.CANCELLED,
      ],
      [BookingStatus.COMPLETED]: [],
      [BookingStatus.CANCELLED]: [],
    };

    if (!transitionMap[booking.status].includes(dto.status)) {
      throw new BadRequestException({
        code: 'BOOKING_STATUS_TRANSITION_NOT_ALLOWED',
        message: `Cannot change booking status from ${booking.status} to ${dto.status}`,
      });
    }

    if (
      dto.status === BookingStatus.CANCELLED &&
      this.isBookingDateTimePast(booking.bookingDate, booking.bookingTime)
    ) {
      throw new BadRequestException({
        code: 'BOOKING_IN_THE_PAST',
        message: 'Past bookings cannot be cancelled',
      });
    }

    const updated = await this.prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: dto.status,
        cancellationReason:
          dto.status === BookingStatus.CANCELLED
            ? (dto.cancellationReason ?? null)
            : null,
        cancelledAt: dto.status === BookingStatus.CANCELLED ? new Date() : null,
      },
      select: {
        id: true,
        status: true,
        cancellationReason: true,
        cancelledAt: true,
        updatedAt: true,
      },
    });

    await this.notifyBookingStatusChanged(booking, dto.status);
    await this.syncDynamoBookingStatus(booking, dto.status);

    return updated;
  }

  async getSettings(userId: string) {
    const doctor = await this.getDoctorByUserId(userId);
    const settings = this.extractAdminSettings(doctor.qualifications);
    const specialtySchedules = await this.getActiveSpecialtySchedules(
      doctor.clinicId,
      doctor.specialtyId,
    );
    const defaultSlotDurationMinutes =
      specialtySchedules[0]?.slotDurationMinutes ?? settings.slotDurationMinutes ?? 30;

    return {
      doctor: {
        id: doctor.id,
        name: doctor.name,
        clinicId: doctor.clinicId,
        specialtyId: doctor.specialtyId,
      },
      settings: {
        slotDurationMinutes: defaultSlotDurationMinutes,
        workingHours: settings.workingHours ?? [],
        services: settings.services ?? [],
        specialtySchedules,
      },
    };
  }

  async upsertSchedule(userId: string, dto: UpsertDoctorScheduleDto) {
    const doctor = await this.getDoctorByUserId(userId);
    const specialtySchedules = await this.getActiveSpecialtySchedules(
      doctor.clinicId,
      doctor.specialtyId,
    );
    if (!specialtySchedules.length) {
      throw new BadRequestException({
        code: 'SPECIALTY_SCHEDULE_REQUIRED',
        message: 'Clinic admin must configure this specialty schedule first',
      });
    }

    dto.workingHours.forEach((row) =>
      this.assertWithinSpecialtySchedules(row, specialtySchedules),
    );

    const defaultSlotDurationMinutes = specialtySchedules[0].slotDurationMinutes;

    const updated = await this.updateDoctorAdminSettings(doctor.id, {
      slotDurationMinutes: defaultSlotDurationMinutes,
      workingHours: dto.workingHours,
    });

    return {
      id: updated.id,
      settings: this.extractAdminSettings(updated.qualifications),
    };
  }

  async upsertServices(userId: string, dto: UpsertDoctorServicesDto) {
    const doctor = await this.getDoctorByUserId(userId);

    const normalizedServices = dto.services.map((item) => ({
      name: item.name.trim(),
      price: item.price,
      currency: item.currency?.trim().toUpperCase() || 'VND',
    }));

    const updated = await this.updateDoctorAdminSettings(doctor.id, {
      services: normalizedServices,
    });

    return {
      id: updated.id,
      settings: this.extractAdminSettings(updated.qualifications),
    };
  }

  async getProfile(userId: string) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { userId },
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
        specialty: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            email: true,
            phone: true,
            avatar: true,
            name: true,
          },
        },
      },
    });

    if (!doctor) {
      throw new ForbiddenException({
        code: 'DOCTOR_PROFILE_NOT_FOUND',
        message: 'Doctor profile is not linked to your account',
      });
    }

    return doctor;
  }

  async updateProfile(userId: string, dto: UpdateDoctorProfileDto) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { userId },
    });

    if (!doctor) {
      throw new ForbiddenException({
        code: 'DOCTOR_PROFILE_NOT_FOUND',
        message: 'Doctor profile is not linked to your account',
      });
    }

    await this.prisma.$transaction(async (tx) => {
      // Update Doctor
      await tx.doctor.update({
        where: { id: doctor.id },
        data: {
          ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
          ...(dto.avatar !== undefined ? { avatar: dto.avatar.trim() } : {}),
          ...(dto.bio !== undefined ? { bio: dto.bio.trim() } : {}),
          ...(dto.experience !== undefined ? { experience: dto.experience } : {}),
        },
      });

      // Update User if any field provided
      if (dto.name || dto.avatar || dto.phone) {
        const userUpdateData: Prisma.UserUpdateInput = {};
        if (dto.name !== undefined) userUpdateData.name = dto.name.trim();
        if (dto.avatar !== undefined) userUpdateData.avatar = dto.avatar.trim();
        if (dto.phone !== undefined) userUpdateData.phone = dto.phone.trim();

        await tx.user.update({
          where: { id: userId },
          data: userUpdateData,
        });
      }
    });

    return this.getProfile(userId);
  }

  private async getDoctorByUserId(userId: string) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { userId },
      select: {
        id: true,
        userId: true,
        clinicId: true,
        specialtyId: true,
        name: true,
        qualifications: true,
      },
    });

    if (!doctor) {
      throw new ForbiddenException({
        code: 'DOCTOR_PROFILE_NOT_FOUND',
        message: 'Doctor profile is not linked to your account',
      });
    }

    return doctor;
  }

  private extractAdminSettings(
    qualifications: Prisma.JsonValue | null,
  ): DoctorAdminSettings {
    if (
      !qualifications ||
      typeof qualifications !== 'object' ||
      Array.isArray(qualifications)
    ) {
      return {};
    }

    const root = qualifications as Record<string, unknown>;
    const settings = root.adminSettings;

    if (!settings || typeof settings !== 'object' || Array.isArray(settings)) {
      return {};
    }

    return settings as unknown as DoctorAdminSettings;
  }

  private isBookingDateTimePast(bookingDate: Date, bookingTime: string) {
    const [hoursRaw, minutesRaw] = bookingTime.split(':');
    const bookingDateTime = new Date(bookingDate);
    bookingDateTime.setHours(Number(hoursRaw), Number(minutesRaw), 0, 0);

    return bookingDateTime.getTime() < Date.now();
  }

  private async getActiveSpecialtySchedules(
    clinicId: string,
    specialtyId: string,
  ) {
    return this.prisma.clinicSpecialtySchedule.findMany({
      where: { clinicId, specialtyId, isActive: true },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }

  private assertWithinSpecialtySchedules(
    row: { dayOfWeek: number; startTime: string; endTime: string },
    schedules: Array<{
      dayOfWeek: number;
      startTime: string;
      endTime: string;
    }>,
  ) {
    if (this.timeToMinutes(row.endTime) <= this.timeToMinutes(row.startTime)) {
      throw new BadRequestException({
        code: 'INVALID_TIME_RANGE',
        message: 'endTime must be later than startTime',
      });
    }

    const start = this.timeToMinutes(row.startTime);
    const end = this.timeToMinutes(row.endTime);
    const isCovered = schedules.some(
      (schedule) =>
        schedule.dayOfWeek === row.dayOfWeek &&
        start >= this.timeToMinutes(schedule.startTime) &&
        end <= this.timeToMinutes(schedule.endTime),
    );

    if (!isCovered) {
      throw new BadRequestException({
        code: 'OUTSIDE_SPECIALTY_SCHEDULE',
        message: 'Doctor working hours must stay within clinic specialty schedule',
      });
    }
  }

  private timeToMinutes(value: string) {
    const [hourRaw, minuteRaw] = value.split(':');
    return Number(hourRaw) * 60 + Number(minuteRaw);
  }

  private async updateDoctorAdminSettings(
    doctorId: string,
    partialSettings: Partial<DoctorAdminSettings>,
  ) {
    const current = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
      select: { id: true, qualifications: true },
    });

    if (!current) {
      throw new NotFoundException({
        code: 'DOCTOR_NOT_FOUND',
        message: 'Doctor not found',
      });
    }

    const baseRoot =
      current.qualifications &&
      typeof current.qualifications === 'object' &&
      !Array.isArray(current.qualifications)
        ? ({ ...current.qualifications } as Prisma.JsonObject)
        : ({} as Prisma.JsonObject);

    const currentSettings = this.extractAdminSettings(current.qualifications);
    baseRoot.adminSettings = {
      ...currentSettings,
      ...partialSettings,
    } as unknown as Prisma.JsonValue;

    return this.prisma.doctor.update({
      where: { id: doctorId },
      data: {
        qualifications: baseRoot as Prisma.InputJsonValue,
      },
      select: {
        id: true,
        qualifications: true,
      },
    });
  }

  private async notifyBookingStatusChanged(
    booking: {
      id: string;
      userId: string;
      patientName: string;
      patientEmail: string;
      patientPhone: string;
      clinicId: string;
      doctorId: string | null;
      bookingDate: Date;
      bookingTime: string;
      clinic: { name: string };
      doctor: { name: string } | null;
    },
    status: BookingStatus,
  ) {
    const appointmentAt = this.formatAppointmentLabel(
      booking.bookingDate,
      booking.bookingTime,
    );
    const data: Prisma.InputJsonObject = {
      bookingId: booking.id,
      status,
      actionUrl: `/account?tab=appointments&bookingId=${booking.id}`,
    };

    if (status === BookingStatus.CONFIRMED) {
      await this.notificationsService.createNotification({
        userId: booking.userId,
        type: NotificationType.BOOKING_CONFIRMED,
        title: 'Appointment confirmed',
        body: `Your appointment at ${booking.clinic.name} has been confirmed for ${appointmentAt}.`,
        data,
        push: true,
        actionUrl: `/account?tab=appointments&bookingId=${booking.id}`,
      });

      try {
        await this.mailService.sendBookingConfirmedEmail({
          email: booking.patientEmail,
          patientName: booking.patientName,
          clinicName: booking.clinic.name,
          doctorName: booking.doctor?.name,
          appointmentAt,
        });
      } catch (error) {
        this.logger.warn(
          `Booking confirmation email failed for ${booking.id}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    if (status === BookingStatus.CANCELLED) {
      await this.notificationsService.createNotification({
        userId: booking.userId,
        type: NotificationType.BOOKING_CANCELLED,
        title: 'Appointment cancelled',
        body: `Your appointment at ${booking.clinic.name} has been cancelled.`,
        data,
        push: true,
        actionUrl: `/account?tab=appointments&bookingId=${booking.id}`,
      });
    }
  }

  private formatAppointmentLabel(bookingDate: Date, bookingTime: string) {
    const [hoursRaw, minutesRaw] = bookingTime.split(':');
    const date = new Date(bookingDate);
    date.setHours(Number(hoursRaw), Number(minutesRaw), 0, 0);

    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(date);
  }

  private async syncDynamoBookingStatus(
    booking: {
      id: string;
      userId: string;
      clinicId: string;
      doctorId: string | null;
      patientName: string;
      patientEmail: string;
      patientPhone: string;
      bookingDate: Date;
      bookingTime: string;
      clinic: { name: string };
      doctor: { name: string } | null;
    },
    status: BookingStatus,
  ) {
    if (status === BookingStatus.CONFIRMED) {
      await this.dynamoAppointmentsService.syncConfirmedBooking({
        ...booking,
        status,
      });
      return;
    }

    if (status === BookingStatus.CANCELLED) {
      await this.dynamoAppointmentsService.syncBookingStatus(
        booking.id,
        status,
      );
    }
  }
}
