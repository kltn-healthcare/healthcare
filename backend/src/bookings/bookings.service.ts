import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BookingStatus,
  BookingType,
  NotificationType,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ERROR_CODES } from '../common/constants/error-codes';
import { NotificationsService } from '../notifications/notifications.service';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RescheduleBookingDto } from './dto/reschedule-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(userId: string, dto: CreateBookingDto) {
    const bookingType =
      dto.bookingType ??
      (dto.packageId
        ? BookingType.HEALTH_PACKAGE
        : BookingType.DOCTOR_CONSULTATION);
    const clinic = await this.prisma.clinic.findUnique({
      where: { id: dto.clinicId },
      select: { id: true, isOpen: true },
    });
    if (!clinic) {
      throw new BadRequestException({
        code: ERROR_CODES.INVALID_CLINIC,
        message: 'Invalid clinicId',
      });
    }

    if (!clinic.isOpen) {
      throw new BadRequestException({
        code: ERROR_CODES.CLINIC_CLOSED,
        message: 'Selected clinic is currently closed',
      });
    }

    let specialtyId = dto.specialtyId;

    if (bookingType === BookingType.HEALTH_PACKAGE) {
      if (!dto.packageId) {
        throw new BadRequestException({
          code: ERROR_CODES.PACKAGE_NOT_FOUND,
          message: 'packageId is required for health package bookings',
        });
      }

      const healthPackage = await this.prisma.healthPackage.findUnique({
        where: { id: dto.packageId },
        select: { id: true, clinicId: true, isActive: true, specialtyId: true },
      });

      if (
        !healthPackage ||
        !healthPackage.isActive ||
        healthPackage.clinicId !== dto.clinicId
      ) {
        throw new BadRequestException({
          code: ERROR_CODES.PACKAGE_NOT_FOUND,
          message: 'Invalid packageId for this clinic',
        });
      }

      specialtyId = healthPackage.specialtyId ?? specialtyId;

      if (!specialtyId) {
        throw new BadRequestException({
          code: 'PACKAGE_SPECIALTY_REQUIRED',
          message: 'Selected package is not linked to a specialty',
        });
      }

      if (dto.doctorId) {
        throw new BadRequestException({
          code: 'PACKAGE_BOOKING_DOCTOR_NOT_ALLOWED',
          message: 'Health package booking must not include doctorId',
        });
      }
    }

    if (bookingType === BookingType.DOCTOR_CONSULTATION) {
      if (!dto.doctorId) {
        throw new BadRequestException({
          code: ERROR_CODES.INVALID_DOCTOR,
          message: 'doctorId is required for doctor consultation bookings',
        });
      }

      const doctor = await this.prisma.doctor.findUnique({
        where: { id: dto.doctorId },
        select: { id: true, clinicId: true, specialtyId: true },
      });
      if (
        !doctor ||
        doctor?.clinicId !== dto.clinicId ||
        (specialtyId && doctor.specialtyId !== specialtyId)
      ) {
        throw new BadRequestException({
          code: ERROR_CODES.INVALID_DOCTOR,
          message: 'Invalid doctorId for this clinic',
        });
      }
      specialtyId = doctor.specialtyId;
    }

    const bookingDate = new Date(dto.bookingDate);
    if (Number.isNaN(bookingDate.getTime())) {
      throw new BadRequestException({
        code: ERROR_CODES.INVALID_BOOKING_DATE,
        message: 'Invalid bookingDate',
      });
    }

    this.assertNotPastBookingDateTime(bookingDate, dto.bookingTime);

    // Slot is considered locked when another patient already has a pending/confirmed booking.
    if (bookingType === BookingType.DOCTOR_CONSULTATION && dto.doctorId) {
      await this.ensureDoctorSlotAvailable(
        dto.doctorId,
        bookingDate,
        dto.bookingTime,
      );
    }

    if (bookingType === BookingType.HEALTH_PACKAGE && dto.packageId) {
      await this.ensurePackageSlotAvailable(
        dto.packageId,
        bookingDate,
        dto.bookingTime,
      );
    }

    const patientDob = dto.patientDob ? new Date(dto.patientDob) : undefined;
    if (dto.patientDob && Number.isNaN(patientDob?.getTime())) {
      throw new BadRequestException({
        code: ERROR_CODES.INVALID_PATIENT_DOB,
        message: 'Invalid patientDob',
      });
    }

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        clinicId: dto.clinicId,
        doctorId:
          bookingType === BookingType.DOCTOR_CONSULTATION
            ? dto.doctorId
            : undefined,
        specialtyId,
        bookingType,
        patientName: dto.patientName,
        patientEmail: dto.patientEmail,
        patientPhone: dto.patientPhone,
        patientDob,
        patientGender: dto.patientGender,
        notes: dto.notes,
        packageId:
          bookingType === BookingType.HEALTH_PACKAGE
            ? dto.packageId
            : undefined,
        bookingDate,
        bookingTime: dto.bookingTime,
      },
      select: {
        id: true,
        status: true,
        bookingDate: true,
        bookingTime: true,
        clinic: { select: { id: true, name: true } },
        doctor: { select: { id: true, name: true } },
        specialty: { select: { id: true, name: true } },
        healthPackage: { select: { id: true, name: true, price: true } },
        createdAt: true,
      },
    });

    await this.notificationsService.createNotification({
      userId,
      type: NotificationType.BOOKING_CREATED,
      title: 'Booking request received',
      body: `Your appointment request at ${booking.clinic.name} is waiting for confirmation.`,
      data: this.bookingNotificationData(booking.id),
    });

    return booking;
  }

  async myBookings(userId: string) {
    const items = await this.prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        status: true,
        bookingDate: true,
        bookingTime: true,
        patientName: true,
        clinic: { select: { id: true, name: true, address: true } },
        doctor: { select: { id: true, name: true } },
        specialty: { select: { id: true, name: true } },
        healthPackage: { select: { id: true, name: true, price: true } },
        createdAt: true,
      },
    });
    return { items };
  }

  async getMyBookingById(userId: string, bookingId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId,
      },
      select: {
        id: true,
        status: true,
        bookingDate: true,
        bookingTime: true,
        patientName: true,
        patientEmail: true,
        patientPhone: true,
        patientDob: true,
        patientGender: true,
        notes: true,
        cancellationReason: true,
        cancelledAt: true,
        clinic: { select: { id: true, name: true, address: true } },
        doctor: { select: { id: true, name: true } },
        specialty: { select: { id: true, name: true } },
        healthPackage: { select: { id: true, name: true, price: true } },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!booking) {
      throw new BadRequestException({
        code: ERROR_CODES.BOOKING_NOT_FOUND,
        message: 'Booking not found',
      });
    }

    return booking;
  }

  async cancelByPatient(
    userId: string,
    bookingId: string,
    dto: CancelBookingDto,
  ) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId,
      },
      select: {
        id: true,
        userId: true,
        status: true,
        bookingDate: true,
        bookingTime: true,
        clinic: { select: { name: true } },
      },
    });

    if (!booking) {
      throw new BadRequestException({
        code: ERROR_CODES.BOOKING_NOT_FOUND,
        message: 'Booking not found',
      });
    }

    if (
      booking.status !== BookingStatus.PENDING &&
      booking.status !== BookingStatus.CONFIRMED
    ) {
      throw new BadRequestException({
        code: ERROR_CODES.BOOKING_CANNOT_BE_CANCELLED,
        message: 'Only pending or confirmed bookings can be cancelled',
      });
    }

    this.assertNotPastBookingDateTime(booking.bookingDate, booking.bookingTime);

    const updated = await this.prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: BookingStatus.CANCELLED,
        cancellationReason: dto.reason?.trim() || 'Cancelled by patient',
        cancelledAt: new Date(),
      },
      select: {
        id: true,
        status: true,
        cancellationReason: true,
        cancelledAt: true,
        updatedAt: true,
      },
    });

    await this.notificationsService.createNotification({
      userId: booking.userId,
      type: NotificationType.BOOKING_CANCELLED,
      title: 'Booking cancelled',
      body: `Your appointment at ${booking.clinic.name} has been cancelled.`,
      data: this.bookingNotificationData(booking.id),
    });

    return updated;
  }

  async rescheduleByPatient(
    userId: string,
    bookingId: string,
    dto: RescheduleBookingDto,
  ) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId,
      },
      select: {
        id: true,
        userId: true,
        status: true,
        doctorId: true,
        bookingDate: true,
        bookingTime: true,
        clinic: { select: { name: true } },
      },
    });

    if (!booking) {
      throw new BadRequestException({
        code: ERROR_CODES.BOOKING_NOT_FOUND,
        message: 'Booking not found',
      });
    }

    if (
      booking.status !== BookingStatus.PENDING &&
      booking.status !== BookingStatus.CONFIRMED
    ) {
      throw new BadRequestException({
        code: ERROR_CODES.BOOKING_CANNOT_BE_RESCHEDULED,
        message: 'Only pending or confirmed bookings can be rescheduled',
      });
    }

    this.assertNotPastBookingDateTime(booking.bookingDate, booking.bookingTime);

    const nextBookingDate = new Date(dto.bookingDate);
    if (Number.isNaN(nextBookingDate.getTime())) {
      throw new BadRequestException({
        code: ERROR_CODES.INVALID_BOOKING_DATE,
        message: 'Invalid bookingDate',
      });
    }

    this.assertNotPastBookingDateTime(nextBookingDate, dto.bookingTime);

    if (booking.doctorId) {
      await this.ensureDoctorSlotAvailable(
        booking.doctorId,
        nextBookingDate,
        dto.bookingTime,
        booking.id,
      );
    }

    const updated = await this.prisma.booking.update({
      where: { id: booking.id },
      data: {
        bookingDate: nextBookingDate,
        bookingTime: dto.bookingTime,
        status: BookingStatus.PENDING,
        cancellationReason: null,
        cancelledAt: null,
      },
      select: {
        id: true,
        status: true,
        bookingDate: true,
        bookingTime: true,
        updatedAt: true,
      },
    });

    await this.notificationsService.createNotification({
      userId: booking.userId,
      type: NotificationType.BOOKING_CREATED,
      title: 'Booking rescheduled',
      body: `Your appointment at ${booking.clinic.name} was rescheduled and is waiting for confirmation.`,
      data: this.bookingNotificationData(booking.id),
    });

    return updated;
  }

  private async ensureDoctorSlotAvailable(
    doctorId: string,
    bookingDate: Date,
    bookingTime: string,
    excludeBookingId?: string,
  ) {
    const dayOfWeek = bookingDate.getUTCDay();
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
      select: {
        id: true,
        clinicId: true,
        specialtyId: true,
        qualifications: true,
      },
    });
    const settings = doctor
      ? this.extractDoctorAdminSettings(doctor.qualifications)
      : {};
    const workingHour = (settings.workingHours ?? []).find(
      (row) => row.dayOfWeek === dayOfWeek,
    );
    const specialtySchedules = doctor
      ? await this.prisma.clinicSpecialtySchedule.findMany({
          where: {
            clinicId: doctor.clinicId,
            specialtyId: doctor.specialtyId,
            dayOfWeek,
            isActive: true,
          },
          orderBy: { startTime: 'asc' },
        })
      : [];

    if (!doctor || !workingHour || !specialtySchedules.length) {
      throw new BadRequestException({
        code: ERROR_CODES.BOOKING_SLOT_UNAVAILABLE,
        message: 'Doctor is not available on this date',
      });
    }

    const slots = specialtySchedules.flatMap((schedule) => {
      const start = Math.max(
        this.timeToMinutes(workingHour.startTime),
        this.timeToMinutes(schedule.startTime),
      );
      const end = Math.min(
        this.timeToMinutes(workingHour.endTime),
        this.timeToMinutes(schedule.endTime),
      );
      return this.buildTimeSlots(
        this.minutesToTime(start),
        this.minutesToTime(end),
        schedule.slotDurationMinutes,
      );
    });

    if (!slots.includes(bookingTime)) {
      throw new BadRequestException({
        code: ERROR_CODES.BOOKING_SLOT_UNAVAILABLE,
        message: 'This booking slot is outside doctor schedule',
      });
    }

    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        doctorId,
        bookingDate,
        bookingTime,
        status: {
          in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
        },
        ...(excludeBookingId ? { NOT: { id: excludeBookingId } } : {}),
      },
      select: { id: true },
    });

    if (existingBooking) {
      throw new BadRequestException({
        code: ERROR_CODES.BOOKING_SLOT_UNAVAILABLE,
        message: 'This booking slot is not available',
      });
    }
  }

  private extractDoctorAdminSettings(qualifications: Prisma.JsonValue | null): {
    workingHours?: Array<{
      dayOfWeek: number;
      startTime: string;
      endTime: string;
    }>;
  } {
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

    return settings as {
      workingHours?: Array<{
        dayOfWeek: number;
        startTime: string;
        endTime: string;
      }>;
    };
  }

  private async ensurePackageSlotAvailable(
    packageId: string,
    bookingDate: Date,
    bookingTime: string,
  ) {
    const dayOfWeek = bookingDate.getUTCDay();
    const healthPackage = await this.prisma.healthPackage.findUnique({
      where: { id: packageId },
      select: {
        id: true,
        clinicId: true,
        specialtyId: true,
        clinic: {
          select: {
            workingHours: {
              where: { dayOfWeek, isOpen: true },
              take: 1,
            },
          },
        },
        availabilities: {
          where: { dayOfWeek, isActive: true },
          take: 1,
        },
      },
    });

    const availability = healthPackage?.availabilities[0];
    const clinicHour = healthPackage?.clinic?.workingHours[0];
    const specialtySchedules =
      healthPackage?.clinicId && healthPackage.specialtyId
        ? await this.prisma.clinicSpecialtySchedule.findMany({
            where: {
              clinicId: healthPackage.clinicId,
              specialtyId: healthPackage.specialtyId,
              dayOfWeek,
              isActive: true,
            },
            orderBy: { startTime: 'asc' },
          })
        : [];
    const source = availability ?? specialtySchedules[0] ?? clinicHour;

    if (!source) {
      throw new BadRequestException({
        code: 'PACKAGE_SLOT_UNAVAILABLE',
        message: 'Selected package is not available on this date',
      });
    }

    const slotDurationMinutes =
      'slotDurationMinutes' in source ? source.slotDurationMinutes : 30;
    const capacity = 'capacity' in source ? source.capacity : 1;
    const slots = availability
      ? this.buildTimeSlots(source.startTime, source.endTime, slotDurationMinutes)
      : specialtySchedules.length
        ? specialtySchedules.flatMap((schedule) =>
            this.buildTimeSlots(
              schedule.startTime,
              schedule.endTime,
              schedule.slotDurationMinutes,
            ),
          )
        : this.buildTimeSlots(source.startTime, source.endTime, slotDurationMinutes);

    if (!slots.includes(bookingTime)) {
      throw new BadRequestException({
        code: 'PACKAGE_SLOT_UNAVAILABLE',
        message: 'Selected package slot is outside working hours',
      });
    }

    const bookedCount = await this.prisma.booking.count({
      where: {
        packageId,
        bookingDate,
        bookingTime,
        status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      },
    });

    if (bookedCount >= capacity) {
      throw new BadRequestException({
        code: 'PACKAGE_SLOT_UNAVAILABLE',
        message: 'Selected package slot is full',
      });
    }
  }

  private assertNotPastBookingDateTime(bookingDate: Date, bookingTime: string) {
    const [hoursRaw, minutesRaw] = bookingTime.split(':');
    const hours = Number(hoursRaw);
    const minutes = Number(minutesRaw);

    if (
      !Number.isInteger(hours) ||
      !Number.isInteger(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      throw new BadRequestException({
        code: ERROR_CODES.INVALID_BOOKING_TIME,
        message: 'Invalid bookingTime, expected HH:mm',
      });
    }

    const dateTime = new Date(bookingDate);
    dateTime.setHours(hours, minutes, 0, 0);

    if (dateTime.getTime() < Date.now()) {
      throw new BadRequestException({
        code: ERROR_CODES.BOOKING_IN_THE_PAST,
        message: 'Booking date/time cannot be in the past',
      });
    }
  }

  private buildTimeSlots(
    startTime: string,
    endTime: string,
    slotMinutes: number,
  ) {
    const start = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(endTime);

    if (end <= start) {
      return [];
    }

    const slots: string[] = [];
    for (
      let cursor = start;
      cursor + slotMinutes <= end;
      cursor += slotMinutes
    ) {
      slots.push(this.minutesToTime(cursor));
    }

    return slots;
  }

  private timeToMinutes(value: string) {
    const [hourRaw, minuteRaw] = value.split(':');
    return Number(hourRaw) * 60 + Number(minuteRaw);
  }

  private minutesToTime(totalMinutes: number): string {
    const hour = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0');
    const minute = (totalMinutes % 60).toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  private bookingNotificationData(bookingId: string): Prisma.InputJsonObject {
    return {
      bookingId,
      actionUrl: `/account?tab=appointments&bookingId=${bookingId}`,
    };
  }
}
