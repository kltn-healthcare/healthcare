import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus, BookingType, NotificationType, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateClinicPackageDto } from './dto/create-clinic-package.dto';
import { QueryClinicAdminBookingsDto } from './dto/query-clinic-admin-bookings.dto';
import { UpdateClinicBookingStatusDto } from './dto/update-clinic-booking-status.dto';
import { UpdateClinicPackageDto } from './dto/update-clinic-package.dto';
import { UpsertClinicWorkingHoursDto } from './dto/upsert-clinic-working-hours.dto';
import { UpsertPackageAvailabilityDto } from './dto/upsert-package-availability.dto';
import { UpsertSpecialtySchedulesDto } from './dto/upsert-specialty-schedules.dto';
import { UpdateClinicProfileDto } from './dto/update-clinic-profile.dto';

@Injectable()
export class ClinicAdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async profile(userId: string) {
    const admin = await this.getClinicAdmin(userId);
    return {
      clinic: admin.clinic,
    };
  }

  async updateProfile(userId: string, dto: UpdateClinicProfileDto) {
    const admin = await this.getClinicAdmin(userId);
    
    const updateData: Prisma.ClinicUpdateInput = {};
    if (dto.name !== undefined) updateData.name = dto.name.trim();
    if (dto.address !== undefined) updateData.address = dto.address.trim();
    if (dto.description !== undefined) updateData.description = dto.description?.trim() || null;
    if (dto.phone !== undefined) updateData.phone = dto.phone?.trim() || null;
    if (dto.email !== undefined) updateData.email = dto.email?.trim().toLowerCase() || null;
    if (dto.website !== undefined) updateData.website = dto.website?.trim() || null;
    if (dto.image !== undefined) updateData.image = dto.image?.trim() || null;
    if (dto.isOpen !== undefined) updateData.isOpen = dto.isOpen;
    if (dto.openingHours !== undefined) updateData.openingHours = dto.openingHours?.trim() || null;
    if (dto.bankInfo !== undefined) updateData.bankInfo = dto.bankInfo?.trim() || null;
    if (dto.depositAmount !== undefined) updateData.depositAmount = dto.depositAmount;

    await this.prisma.clinic.update({
      where: { id: admin.clinicId },
      data: updateData,
    });

    return this.profile(userId);
  }

  async upsertWorkingHours(userId: string, dto: UpsertClinicWorkingHoursDto) {
    const admin = await this.getClinicAdmin(userId);
    dto.workingHours.forEach((row) => this.assertValidTimeRange(row.startTime, row.endTime));

    await this.prisma.$transaction(
      dto.workingHours.map((row) =>
        this.prisma.clinicWorkingHour.upsert({
          where: {
            clinicId_dayOfWeek: {
              clinicId: admin.clinicId,
              dayOfWeek: row.dayOfWeek,
            },
          },
          update: {
            isOpen: row.isOpen,
            startTime: row.startTime,
            endTime: row.endTime,
          },
          create: {
            clinicId: admin.clinicId,
            dayOfWeek: row.dayOfWeek,
            isOpen: row.isOpen,
            startTime: row.startTime,
            endTime: row.endTime,
          },
        }),
      ),
    );

    return this.profile(userId);
  }

  async upsertSpecialtySchedules(
    userId: string,
    specialtyId: string,
    dto: UpsertSpecialtySchedulesDto,
  ) {
    const admin = await this.getClinicAdmin(userId);
    await this.assertClinicHasSpecialty(admin.clinicId, specialtyId);

    const clinicHours = await this.prisma.clinicWorkingHour.findMany({
      where: { clinicId: admin.clinicId, isOpen: true },
    });

    dto.schedules.forEach((row) => {
      this.assertValidTimeRange(row.startTime, row.endTime);
      if (row.isActive) {
        this.assertWithinClinicHours(row, clinicHours);
      }
    });

    await this.prisma.$transaction([
      this.prisma.clinicSpecialtySchedule.deleteMany({
        where: { clinicId: admin.clinicId, specialtyId },
      }),
      this.prisma.clinicSpecialtySchedule.createMany({
        data: dto.schedules.map((row) => ({
          clinicId: admin.clinicId,
          specialtyId,
          dayOfWeek: row.dayOfWeek,
          isActive: row.isActive,
          startTime: row.startTime,
          endTime: row.endTime,
          slotDurationMinutes: row.slotDurationMinutes,
          capacity: row.capacity,
        })),
      }),
    ]);

    const schedules = await this.prisma.clinicSpecialtySchedule.findMany({
      where: { clinicId: admin.clinicId, specialtyId },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    return { items: schedules };
  }

  async createPackage(userId: string, dto: CreateClinicPackageDto) {
    const admin = await this.getClinicAdmin(userId);
    await this.assertClinicHasSpecialty(admin.clinicId, dto.specialtyId);

    return this.prisma.healthPackage.create({
      data: {
        clinicId: admin.clinicId,
        specialtyId: dto.specialtyId,
        name: dto.name.trim(),
        description: dto.description.trim(),
        shortDescription: dto.shortDescription?.trim() || null,
        price: dto.price,
        promotionalPrice: dto.promotionalPrice ?? null,
        isActive: dto.isActive ?? true,
        features: dto.features ?? [],
      },
      select: this.packageSelect(),
    });
  }

  async updatePackage(
    userId: string,
    packageId: string,
    dto: UpdateClinicPackageDto,
  ) {
    const admin = await this.getClinicAdmin(userId);
    const healthPackage = await this.prisma.healthPackage.findUnique({
      where: { id: packageId },
      select: { id: true, clinicId: true, specialtyId: true },
    });

    if (!healthPackage || healthPackage.clinicId !== admin.clinicId) {
      throw new NotFoundException({
        code: 'PACKAGE_NOT_FOUND',
        message: 'Package not found for your clinic',
      });
    }

    const nextSpecialtyId = dto.specialtyId ?? healthPackage.specialtyId;
    if (nextSpecialtyId) {
      await this.assertClinicHasSpecialty(admin.clinicId, nextSpecialtyId);
    }

    return this.prisma.healthPackage.update({
      where: { id: packageId },
      data: {
        ...(dto.name !== undefined ? { name: dto.name.trim() } : {}),
        ...(dto.description !== undefined
          ? { description: dto.description.trim() }
          : {}),
        ...(dto.shortDescription !== undefined
          ? { shortDescription: dto.shortDescription?.trim() || null }
          : {}),
        ...(dto.price !== undefined ? { price: dto.price } : {}),
        ...(dto.promotionalPrice !== undefined
          ? { promotionalPrice: dto.promotionalPrice }
          : {}),
        ...(dto.isActive !== undefined ? { isActive: dto.isActive } : {}),
        ...(dto.features !== undefined ? { features: dto.features } : {}),
        ...(dto.specialtyId !== undefined ? { specialtyId: dto.specialtyId } : {}),
      },
      select: this.packageSelect(),
    });
  }

  async upsertPackageAvailability(
    userId: string,
    packageId: string,
    dto: UpsertPackageAvailabilityDto,
  ) {
    const admin = await this.getClinicAdmin(userId);
    const healthPackage = await this.prisma.healthPackage.findUnique({
      where: { id: packageId },
      select: { id: true, clinicId: true, specialtyId: true },
    });

    if (!healthPackage || healthPackage.clinicId !== admin.clinicId) {
      throw new NotFoundException({
        code: 'PACKAGE_NOT_FOUND',
        message: 'Package not found for your clinic',
      });
    }

    const clinicHours = await this.prisma.clinicWorkingHour.findMany({
      where: { clinicId: admin.clinicId, isOpen: true },
    });
    const specialtySchedules = healthPackage.specialtyId
      ? await this.prisma.clinicSpecialtySchedule.findMany({
          where: {
            clinicId: admin.clinicId,
            specialtyId: healthPackage.specialtyId,
            isActive: true,
          },
        })
      : [];

    dto.availability.forEach((row) => {
      this.assertValidTimeRange(row.startTime, row.endTime);
      if (row.isActive) {
        this.assertWithinClinicHours(row, clinicHours);
        if (specialtySchedules.length) {
          this.assertWithinSpecialtySchedules(row, specialtySchedules);
        }
      }
    });

    await this.prisma.$transaction(
      dto.availability.map((row) =>
        this.prisma.packageAvailability.upsert({
          where: {
            packageId_dayOfWeek: {
              packageId,
              dayOfWeek: row.dayOfWeek,
            },
          },
          update: {
            isActive: row.isActive,
            startTime: row.startTime,
            endTime: row.endTime,
            slotDurationMinutes: row.slotDurationMinutes,
            capacity: row.capacity,
          },
          create: {
            packageId,
            dayOfWeek: row.dayOfWeek,
            isActive: row.isActive,
            startTime: row.startTime,
            endTime: row.endTime,
            slotDurationMinutes: row.slotDurationMinutes,
            capacity: row.capacity,
          },
        }),
      ),
    );

    const availability = await this.prisma.packageAvailability.findMany({
      where: { packageId },
      orderBy: { dayOfWeek: 'asc' },
    });

    return { items: availability };
  }

  async bookings(userId: string, query: QueryClinicAdminBookingsDto) {
    if (!(this.prisma as any).booking) {
      let backendUrl = process.env.APPOINTMENT_SERVICE_URL || process.env.BACKEND_URL || 'http://localhost:8080';
      if (backendUrl.includes('healthcare-backend')) {
        backendUrl = backendUrl.replace('healthcare-backend', 'healthcare-appointment');
      }
      const q = new URLSearchParams();
      q.set('userId', userId);
      if (query.status) q.set('status', query.status);
      if (query.date) q.set('date', query.date);
      const res = await fetch(`${backendUrl}/v1/bookings/internal/clinic-bookings?${q.toString()}`);
      if (!res.ok) {
        throw new BadRequestException('Could not fetch clinic bookings');
      }
      return await res.json();
    }

    const admin = await this.getClinicAdmin(userId);
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
      select: {
        id: true,
        status: true,
        bookingDate: true,
        bookingTime: true,
        patientName: true,
        patientEmail: true,
        patientPhone: true,
        notes: true,
        bookingType: true,
        paymentReceiptUrl: true,
        healthPackage: { select: { id: true, name: true, price: true } },
        doctor: { select: { id: true, name: true } },
        specialty: { select: { id: true, name: true } },
        createdAt: true,
      },
    });

    return { items };
  }

  async updateBookingStatus(
    userId: string,
    bookingId: string,
    dto: UpdateClinicBookingStatusDto,
  ) {
    if (!(this.prisma as any).booking) {
      let backendUrl = process.env.APPOINTMENT_SERVICE_URL || process.env.BACKEND_URL || 'http://localhost:8080';
      if (backendUrl.includes('healthcare-backend')) {
        backendUrl = backendUrl.replace('healthcare-backend', 'healthcare-appointment');
      }
      const res = await fetch(`${backendUrl}/v1/bookings/internal/clinic-bookings/${bookingId}/status?userId=${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new BadRequestException(err.message || 'Could not update booking status');
      }
      return await res.json();
    }

    const admin = await this.getClinicAdmin(userId);
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        userId: true,
        clinicId: true,
        bookingType: true,
        status: true,
        patientName: true,
        patientEmail: true,
        bookingDate: true,
        bookingTime: true,
        clinic: { select: { name: true } },
        healthPackage: { select: { name: true } },
      },
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

    await this.notifyBookingStatusChanged(booking, dto.status);
    return updated;
  }

  private async getClinicAdmin(userId: string) {
    const admin = await this.prisma.clinicAdmin.findUnique({
      where: { userId },
      select: {
        id: true,
        clinicId: true,
        clinic: {
          select: {
            id: true,
            name: true,
            description: true,
            address: true,
            phone: true,
            email: true,
            website: true,
            image: true,
            isOpen: true,
            openingHours: true,
            workingHours: { orderBy: { dayOfWeek: 'asc' } },
            specialties: {
              include: {
                specialty: true,
                schedules: { orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }] },
              },
              orderBy: { createdAt: 'asc' },
            },
            healthPackages: {
              select: this.packageSelect(),
              orderBy: { createdAt: 'desc' },
            },
          },
        },
      },
    });

    if (!admin) {
      throw new ForbiddenException({
        code: 'CLINIC_ADMIN_PROFILE_NOT_FOUND',
        message: 'Clinic admin profile is not linked to your account',
      });
    }

    return admin;
  }

  private async assertClinicHasSpecialty(clinicId: string, specialtyId: string) {
    const match = await this.prisma.clinicSpecialty.findUnique({
      where: { clinicId_specialtyId: { clinicId, specialtyId } },
    });

    if (!match) {
      throw new BadRequestException({
        code: 'CLINIC_SPECIALTY_NOT_FOUND',
        message: 'Selected specialty does not belong to your clinic',
      });
    }
  }

  private assertValidTimeRange(startTime: string, endTime: string) {
    if (this.timeToMinutes(endTime) <= this.timeToMinutes(startTime)) {
      throw new BadRequestException({
        code: 'INVALID_TIME_RANGE',
        message: 'endTime must be later than startTime',
      });
    }
  }

  private assertWithinClinicHours(
    row: { dayOfWeek: number; startTime: string; endTime: string },
    clinicHours: Array<{ dayOfWeek: number; startTime: string; endTime: string }>,
  ) {
    const start = this.timeToMinutes(row.startTime);
    const end = this.timeToMinutes(row.endTime);
    const isCovered = clinicHours.some(
      (hour) =>
        hour.dayOfWeek === row.dayOfWeek &&
        start >= this.timeToMinutes(hour.startTime) &&
        end <= this.timeToMinutes(hour.endTime),
    );

    if (!isCovered) {
      throw new BadRequestException({
        code: 'OUTSIDE_CLINIC_WORKING_HOURS',
        message: 'Schedule must stay within clinic working hours',
      });
    }
  }

  private assertWithinSpecialtySchedules(
    row: { dayOfWeek: number; startTime: string; endTime: string },
    schedules: Array<{ dayOfWeek: number; startTime: string; endTime: string }>,
  ) {
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
        message: 'Package slot must stay within its specialty schedule',
      });
    }
  }

  private timeToMinutes(value: string) {
    const [hourRaw, minuteRaw] = value.split(':');
    return Number(hourRaw) * 60 + Number(minuteRaw);
  }

  private packageSelect() {
    return {
      id: true,
      name: true,
      description: true,
      shortDescription: true,
      price: true,
      promotionalPrice: true,
      isActive: true,
      features: true,
      specialtyId: true,
      specialty: { select: { id: true, name: true } },
      availabilities: { orderBy: { dayOfWeek: 'asc' as const } },
    };
  }

  private async notifyBookingStatusChanged(
    booking: {
      id: string;
      userId: string;
      bookingDate: Date;
      bookingTime: string;
      clinic: { name: string };
      healthPackage: { name: string } | null;
    },
    status: BookingStatus,
  ) {
    if (
      status !== BookingStatus.CONFIRMED &&
      status !== BookingStatus.CANCELLED
    ) {
      return;
    }

    await this.notificationsService.createNotification({
      userId: booking.userId,
      type:
        status === BookingStatus.CONFIRMED
          ? NotificationType.BOOKING_CONFIRMED
          : NotificationType.BOOKING_CANCELLED,
      title:
        status === BookingStatus.CONFIRMED
          ? 'Package booking confirmed'
          : 'Package booking cancelled',
      body:
        status === BookingStatus.CONFIRMED
          ? `Your package booking at ${booking.clinic.name} has been confirmed.`
          : `Your package booking at ${booking.clinic.name} has been cancelled.`,
      data: {
        bookingId: booking.id,
        status,
        actionUrl: `/account?tab=appointments&bookingId=${booking.id}`,
      },
      push: true,
      actionUrl: `/account?tab=appointments&bookingId=${booking.id}`,
    });
  }
}
