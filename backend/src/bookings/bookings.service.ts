import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  BookingStatus,
  BookingType,
  NotificationType,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DynamoAppointmentsService } from '../aws/dynamo-appointments.service';
import { ERROR_CODES } from '../common/constants/error-codes';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RescheduleBookingDto } from './dto/reschedule-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dynamoAppointmentsService: DynamoAppointmentsService,
  ) {}

  async create(userId: string, dto: CreateBookingDto) {
    const user = await this.fetchUserInternal(userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedException({
        code: ERROR_CODES.USER_NOT_FOUND,
        message: 'Your login session is no longer valid. Please sign in again.',
      });
    }

    const bookingType =
      dto.bookingType ??
      (dto.packageId
        ? BookingType.HEALTH_PACKAGE
        : BookingType.DOCTOR_CONSULTATION);

    const bookingDate = new Date(dto.bookingDate);
    if (Number.isNaN(bookingDate.getTime())) {
      throw new BadRequestException({
        code: ERROR_CODES.INVALID_BOOKING_DATE,
        message: 'Invalid bookingDate',
      });
    }

    this.assertNotPastBookingDateTime(bookingDate, dto.bookingTime);

    // Call Admin Service to validate slot schedule & resolve names
    const slotValidation = await this.validateSlotInternal({
      bookingType,
      clinicId: dto.clinicId,
      doctorId: dto.doctorId,
      packageId: dto.packageId,
      specialtyId: dto.specialtyId,
      bookingDate,
      bookingTime: dto.bookingTime,
    });

    const specialtyId = slotValidation.specialtyId;

    // Check duplicate/overlap locally in Booking database
    if (bookingType === BookingType.DOCTOR_CONSULTATION && dto.doctorId) {
      const existingBooking = await this.prisma.booking.findFirst({
        where: {
          doctorId: dto.doctorId,
          bookingDate,
          bookingTime: dto.bookingTime,
          status: {
            in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
          },
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

    if (bookingType === BookingType.HEALTH_PACKAGE && dto.packageId) {
      const bookedCount = await this.prisma.booking.count({
        where: {
          packageId: dto.packageId,
          bookingDate,
          bookingTime: dto.bookingTime,
          status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
        },
      });

      if (bookedCount >= slotValidation.capacity) {
        throw new BadRequestException({
          code: 'PACKAGE_SLOT_UNAVAILABLE',
          message: 'Selected package slot is full',
        });
      }
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
        paymentReceiptUrl: dto.paymentReceiptUrl,
        bookingDate,
        bookingTime: dto.bookingTime,
      },
      select: {
        id: true,
        status: true,
        bookingDate: true,
        bookingTime: true,
        clinicId: true,
        doctorId: true,
        specialtyId: true,
        packageId: true,
        createdAt: true,
      },
    });

    // Compose response format matching original (API Composition)
    const composedBooking = {
      ...booking,
      clinic: { id: booking.clinicId, name: slotValidation.clinicName },
      doctor: booking.doctorId ? { id: booking.doctorId, name: slotValidation.doctorName } : null,
      specialty: booking.specialtyId ? { id: booking.specialtyId, name: slotValidation.specialtyName } : null,
      healthPackage: booking.packageId ? { id: booking.packageId, name: slotValidation.packageName, price: slotValidation.packagePrice } : null,
    };

    await this.createNotificationInternal({
      userId,
      type: NotificationType.BOOKING_CREATED,
      title: 'Booking request received',
      body: `Your appointment request at ${slotValidation.clinicName} is waiting for confirmation.`,
      data: this.bookingNotificationData(booking.id),
    });

    return composedBooking;
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
        paymentReceiptUrl: true,
        patientName: true,
        clinicId: true,
        doctorId: true,
        specialtyId: true,
        packageId: true,
        createdAt: true,
      },
    });

    if (items.length === 0) {
      return { items: [] };
    }

    // API Composition: Batch resolve names
    const clinicIds = Array.from(new Set(items.map(i => i.clinicId)));
    const doctorIds = Array.from(new Set(items.map(i => i.doctorId).filter(Boolean))) as string[];
    const specialtyIds = Array.from(new Set(items.map(i => i.specialtyId).filter(Boolean))) as string[];
    const packageIds = Array.from(new Set(items.map(i => i.packageId).filter(Boolean))) as string[];

    const resolved = await this.resolveBatchInternal({
      clinicIds,
      doctorIds,
      specialtyIds,
      packageIds,
    });

    const composedItems = items.map(item => {
      const clinic = resolved?.clinics?.[item.clinicId] || { id: item.clinicId, name: 'Clinic', address: '' };
      const doctor = item.doctorId && resolved?.doctors?.[item.doctorId] ? resolved.doctors[item.doctorId] : null;
      const specialty = item.specialtyId && resolved?.specialties?.[item.specialtyId] ? resolved.specialties[item.specialtyId] : null;
      const healthPackage = item.packageId && resolved?.packages?.[item.packageId] ? resolved.packages[item.packageId] : null;

      return {
        id: item.id,
        status: item.status,
        bookingDate: item.bookingDate,
        bookingTime: item.bookingTime,
        paymentReceiptUrl: item.paymentReceiptUrl,
        patientName: item.patientName,
        clinic,
        doctor,
        specialty,
        healthPackage,
        createdAt: item.createdAt,
      };
    });

    return { items: composedItems };
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
        paymentReceiptUrl: true,
        patientName: true,
        patientEmail: true,
        patientPhone: true,
        patientDob: true,
        patientGender: true,
        notes: true,
        cancellationReason: true,
        cancelledAt: true,
        clinicId: true,
        doctorId: true,
        specialtyId: true,
        packageId: true,
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

    // API Composition: Resolve details
    const resolved = await this.resolveBatchInternal({
      clinicIds: [booking.clinicId],
      doctorIds: booking.doctorId ? [booking.doctorId] : [],
      specialtyIds: booking.specialtyId ? [booking.specialtyId] : [],
      packageIds: booking.packageId ? [booking.packageId] : [],
    });

    const clinic = resolved?.clinics?.[booking.clinicId] || { id: booking.clinicId, name: 'Clinic', address: '' };
    const doctor = booking.doctorId && resolved?.doctors?.[booking.doctorId] ? resolved.doctors[booking.doctorId] : null;
    const specialty = booking.specialtyId && resolved?.specialties?.[booking.specialtyId] ? resolved.specialties[booking.specialtyId] : null;
    const healthPackage = booking.packageId && resolved?.packages?.[booking.packageId] ? resolved.packages[booking.packageId] : null;

    return {
      id: booking.id,
      status: booking.status,
      bookingDate: booking.bookingDate,
      bookingTime: booking.bookingTime,
      paymentReceiptUrl: booking.paymentReceiptUrl,
      patientName: booking.patientName,
      patientEmail: booking.patientEmail,
      patientPhone: booking.patientPhone,
      patientDob: booking.patientDob,
      patientGender: booking.patientGender,
      notes: booking.notes,
      cancellationReason: booking.cancellationReason,
      cancelledAt: booking.cancelledAt,
      clinic,
      doctor,
      specialty,
      healthPackage,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
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
        clinicId: true,
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

    const clinic = await this.fetchClinicInternal(booking.clinicId);
    const clinicName = clinic?.name || 'Clinic';

    await this.createNotificationInternal({
      userId: booking.userId,
      type: NotificationType.BOOKING_CANCELLED,
      title: 'Booking cancelled',
      body: `Your appointment at ${clinicName} has been cancelled.`,
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
        clinicId: true,
        specialtyId: true,
        packageId: true,
        bookingType: true,
        bookingDate: true,
        bookingTime: true,
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

    // Call Admin Service to validate availability of new slot
    const slotValidation = await this.validateSlotInternal({
      bookingType: booking.bookingType,
      clinicId: booking.clinicId,
      doctorId: booking.doctorId || undefined,
      packageId: booking.packageId || undefined,
      specialtyId: booking.specialtyId || undefined,
      bookingDate: nextBookingDate,
      bookingTime: dto.bookingTime,
    });

    // Check duplicate/overlap locally
    if (booking.bookingType === BookingType.DOCTOR_CONSULTATION && booking.doctorId) {
      const existingBooking = await this.prisma.booking.findFirst({
        where: {
          doctorId: booking.doctorId,
          bookingDate: nextBookingDate,
          bookingTime: dto.bookingTime,
          status: {
            in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
          },
          NOT: { id: booking.id },
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

    if (booking.bookingType === BookingType.HEALTH_PACKAGE && booking.packageId) {
      const bookedCount = await this.prisma.booking.count({
        where: {
          packageId: booking.packageId,
          bookingDate: nextBookingDate,
          bookingTime: dto.bookingTime,
          status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
          NOT: { id: booking.id },
        },
      });

      if (bookedCount >= slotValidation.capacity) {
        throw new BadRequestException({
          code: 'PACKAGE_SLOT_UNAVAILABLE',
          message: 'Selected package slot is full',
        });
      }
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

    await this.createNotificationInternal({
      userId: booking.userId,
      type: NotificationType.BOOKING_CREATED,
      title: 'Booking rescheduled',
      body: `Your appointment at ${slotValidation.clinicName} was rescheduled and is waiting for confirmation.`,
      data: this.bookingNotificationData(booking.id),
    });

    return updated;
  }

  private async fetchUserInternal(userId: string) {
    try {
      const identityUrl = process.env.IDENTITY_SERVICE_URL || 'http://localhost:3001';
      const res = await fetch(`${identityUrl}/v1/users/internal/${userId}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error('Error fetching user from identity service:', error);
      return null;
    }
  }

  private async fetchClinicInternal(clinicId: string) {
    try {
      const adminUrl = process.env.ADMIN_SERVICE_URL || 'http://localhost:3002';
      const res = await fetch(`${adminUrl}/v1/admin/internal/clinics/${clinicId}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error('Error fetching clinic from admin service:', error);
      return null;
    }
  }

  private async validateSlotInternal(body: {
    bookingType: string;
    clinicId: string;
    doctorId?: string;
    packageId?: string;
    specialtyId?: string;
    bookingDate: Date;
    bookingTime: string;
  }) {
    try {
      const adminUrl = process.env.ADMIN_SERVICE_URL || 'http://localhost:3002';
      const res = await fetch(`${adminUrl}/v1/admin/internal/validate-slot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          bookingDate: body.bookingDate.toISOString().split('T')[0],
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new BadRequestException(err);
      }
      return await res.json();
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error('Error validating slot from admin service:', error);
      throw new BadRequestException({
        code: 'VALIDATION_FAILED',
        message: 'Could not validate availability slot due to communication error',
      });
    }
  }

  private async resolveBatchInternal(body: {
    clinicIds?: string[];
    doctorIds?: string[];
    specialtyIds?: string[];
    packageIds?: string[];
  }) {
    try {
      const adminUrl = process.env.ADMIN_SERVICE_URL || 'http://localhost:3002';
      const res = await fetch(`${adminUrl}/v1/admin/internal/resolve-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) return null;
      return await res.json();
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
      const identityUrl = process.env.IDENTITY_SERVICE_URL || 'http://localhost:3001';
      const res = await fetch(`${identityUrl}/v1/notifications/internal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        console.error('Failed to create notification', await res.text());
      }
    } catch (error) {
      console.error('Error sending notification to identity service:', error);
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

  private bookingNotificationData(bookingId: string): Prisma.InputJsonObject {
    return {
      bookingId,
      actionUrl: `/account?tab=appointments&bookingId=${bookingId}`,
    };
  }

  // ==========================================
  // Doctor Admin Booking Management (Moved to Appointment Service)
  // ==========================================

  async doctorGetBookings(userId: string, query: any) {
    const doctor = await this.fetchDoctorByUserId(userId);

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
    });

    if (items.length === 0) return { items: [] };

    // Resolve clinics via batch resolve
    const clinicIds = Array.from(new Set(items.map(i => i.clinicId)));
    const resolved = await this.resolveBatchInternal({ clinicIds });

    const composedItems = items.map(item => {
      const clinic = resolved?.clinics?.[item.clinicId] || { id: item.clinicId, name: 'Clinic', address: '' };
      return {
        id: item.id,
        status: item.status,
        bookingDate: item.bookingDate,
        bookingTime: item.bookingTime,
        patientName: item.patientName,
        patientEmail: item.patientEmail,
        patientPhone: item.patientPhone,
        notes: item.notes,
        paymentReceiptUrl: item.paymentReceiptUrl,
        clinic,
        createdAt: item.createdAt,
      };
    });

    return { items: composedItems };
  }

  async doctorUpdateBookingStatus(
    userId: string,
    bookingId: string,
    dto: any,
  ) {
    const doctor = await this.fetchDoctorByUserId(userId);

    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
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

    // Send notifications & sync Dynamo
    const clinic = await this.fetchClinicInternal(booking.clinicId);
    const resolvedBooking = {
      ...booking,
      clinic: clinic || { name: 'Clinic' },
      doctor: { name: doctor.name },
    };

    await this.notifyBookingStatusChanged(resolvedBooking, dto.status);
    await this.dynamoAppointmentsService.syncBookingStatus(booking.id, dto.status);

    return updated;
  }

  // ==========================================
  // Clinic Admin Booking Management (Moved to Appointment Service)
  // ==========================================

  async clinicGetBookings(userId: string, query: any) {
    const admin = await this.fetchClinicAdminByUserId(userId);
    const where: Prisma.BookingWhereInput = {
      clinicId: admin.clinicId,
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
      where.bookingDate = from;
    }

    const items = await this.prisma.booking.findMany({
      where,
      orderBy: [{ bookingDate: 'asc' }, { bookingTime: 'asc' }],
      take: 200,
    });

    if (items.length === 0) return { items: [] };

    // Resolve entities via batch resolve
    const doctorIds = Array.from(new Set(items.map(i => i.doctorId).filter(Boolean))) as string[];
    const specialtyIds = Array.from(new Set(items.map(i => i.specialtyId).filter(Boolean))) as string[];
    const packageIds = Array.from(new Set(items.map(i => i.packageId).filter(Boolean))) as string[];

    const resolved = await this.resolveBatchInternal({ doctorIds, specialtyIds, packageIds });

    const composedItems = items.map(item => {
      const doctor = item.doctorId && resolved?.doctors?.[item.doctorId] ? resolved.doctors[item.doctorId] : null;
      const specialty = item.specialtyId && resolved?.specialties?.[item.specialtyId] ? resolved.specialties[item.specialtyId] : null;
      const healthPackage = item.packageId && resolved?.packages?.[item.packageId] ? resolved.packages[item.packageId] : null;

      return {
        id: item.id,
        status: item.status,
        bookingDate: item.bookingDate,
        bookingTime: item.bookingTime,
        patientName: item.patientName,
        patientEmail: item.patientEmail,
        patientPhone: item.patientPhone,
        notes: item.notes,
        bookingType: item.bookingType,
        paymentReceiptUrl: item.paymentReceiptUrl,
        healthPackage,
        doctor,
        specialty,
        createdAt: item.createdAt,
      };
    });

    return { items: composedItems };
  }

  async clinicUpdateBookingStatus(
    userId: string,
    bookingId: string,
    dto: any,
  ) {
    const admin = await this.fetchClinicAdminByUserId(userId);
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking || booking.clinicId !== admin.clinicId) {
      throw new NotFoundException({
        code: 'BOOKING_NOT_FOUND',
        message: 'Booking not found',
      });
    }

    if (booking.bookingType === BookingType.DOCTOR_CONSULTATION) {
      throw new ForbiddenException({
        code: 'DOCTOR_BOOKING_NOT_ALLOWED',
        message: 'Clinic admins cannot manage doctor consultation bookings directly.',
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

    const clinic = await this.fetchClinicInternal(booking.clinicId);
    const healthPackage = booking.packageId ? await this.fetchHealthPackageInternal(booking.packageId) : null;

    const resolvedBooking = {
      ...booking,
      clinic: clinic || { name: 'Clinic' },
      healthPackage: healthPackage || undefined,
    };

    await this.notifyBookingStatusChanged(resolvedBooking, dto.status);
    await this.dynamoAppointmentsService.syncBookingStatus(booking.id, dto.status);

    return updated;
  }

  // ==========================================
  // Internal Helpers for HTTP API Composition
  // ==========================================

  private async fetchDoctorByUserId(userId: string) {
    try {
      const adminUrl = process.env.ADMIN_SERVICE_URL || 'http://localhost:3002';
      const res = await fetch(`${adminUrl}/v1/admin/internal/doctors/by-user/${userId}`);
      if (!res.ok) {
        throw new NotFoundException('Doctor profile not found');
      }
      return await res.json();
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error fetching doctor by userId:', error);
      throw new BadRequestException('Could not fetch doctor profile');
    }
  }

  private async fetchClinicAdminByUserId(userId: string) {
    try {
      const adminUrl = process.env.ADMIN_SERVICE_URL || 'http://localhost:3002';
      const res = await fetch(`${adminUrl}/v1/admin/internal/clinic-admins/by-user/${userId}`);
      if (!res.ok) {
        throw new NotFoundException('Clinic admin profile not found');
      }
      return await res.json();
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error fetching clinic admin by userId:', error);
      throw new BadRequestException('Could not fetch clinic admin profile');
    }
  }

  private async fetchHealthPackageInternal(packageId: string) {
    try {
      const adminUrl = process.env.ADMIN_SERVICE_URL || 'http://localhost:3002';
      const res = await fetch(`${adminUrl}/v1/admin/internal/health-packages/${packageId}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (error) {
      console.error('Error fetching package details:', error);
      return null;
    }
  }

  private isBookingDateTimePast(bookingDate: Date, bookingTime: string) {
    const [hoursRaw, minutesRaw] = bookingTime.split(':');
    const bookingDateTime = new Date(bookingDate);
    bookingDateTime.setHours(Number(hoursRaw), Number(minutesRaw), 0, 0);
    return bookingDateTime.getTime() < Date.now();
  }

  private async notifyBookingStatusChanged(booking: any, status: BookingStatus) {
    const appointmentAt = this.formatAppointmentLabel(
      booking.bookingDate,
      booking.bookingTime,
    );

    if (status === BookingStatus.CONFIRMED) {
      await this.createNotificationInternal({
        userId: booking.userId,
        type: NotificationType.BOOKING_CONFIRMED,
        title: 'Lich hen da duoc xac nhan',
        body: `Lich hen cua ban tai ${booking.clinic.name} da duoc xac nhan vao ${appointmentAt}.`,
        data: this.bookingNotificationData(booking.id),
        push: true,
        actionUrl: `/account?tab=appointments&bookingId=${booking.id}`,
      });
    } else if (status === BookingStatus.CANCELLED) {
      await this.createNotificationInternal({
        userId: booking.userId,
        type: NotificationType.BOOKING_CANCELLED,
        title: 'Lich hen da bi huy',
        body: `Lich hen cua ban tai ${booking.clinic.name} da bi huy.`,
        data: this.bookingNotificationData(booking.id),
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
}
