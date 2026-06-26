import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ERROR_CODES } from '../common/constants/error-codes';
import { QueryPackagesDto } from './dto/query-packages.dto';

const packageSelect = {
  id: true,
  name: true,
  shortDescription: true,
  description: true,
  price: true,
  promotionalPrice: true,
  currency: true,
  category: true,
  targetGender: true,
  targetAgeRange: true,
  preparationNotes: true,
  isPopular: true,
  isActive: true,
  features: true,
  imageUrl: true,
  clinicId: true,
  clinic: { select: { id: true, name: true, address: true, image: true } },
  specialtyId: true,
  specialty: { select: { id: true, name: true } },
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async findAll(dto: QueryPackagesDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 12;
    const skip = (page - 1) * limit;
    const where = {
      isActive: true,
      clinicId: { not: null },
      ...(dto.clinicId ? { clinicId: dto.clinicId } : {}),
      ...(dto.category ? { category: dto.category } : {}),
      ...(dto.specialtyId ? { specialtyId: dto.specialtyId } : {}),
      ...(dto.isPopular !== undefined ? { isPopular: dto.isPopular } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.healthPackage.findMany({
        where,
        orderBy: [{ isPopular: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
        select: packageSelect,
      }),
      this.prisma.healthPackage.count({ where }),
    ]);

    return {
      items: items.map((item) => this.serializePackage(item)),
      page,
      limit,
      total,
    };
  }

  async findOne(id: string) {
    const healthPackage = await this.prisma.healthPackage.findUnique({
      where: { id },
      select: packageSelect,
    });
    if (!healthPackage || !healthPackage.isActive || !healthPackage.clinicId) {
      throw new NotFoundException({
        code: ERROR_CODES.PACKAGE_NOT_FOUND,
        message: `Health package with ID ${id} not found`,
      });
    }
    return this.serializePackage(healthPackage);
  }

  async findByCategory(category: string) {
    const items = await this.prisma.healthPackage.findMany({
      where: { category, isActive: true, clinicId: { not: null } },
      orderBy: [{ isPopular: 'desc' }, { createdAt: 'desc' }],
      select: packageSelect,
    });
    return items.map((item) => this.serializePackage(item));
  }

  async findPopular() {
    const items = await this.prisma.healthPackage.findMany({
      where: { isPopular: true, isActive: true, clinicId: { not: null } },
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: packageSelect,
    });
    return items.map((item) => this.serializePackage(item));
  }

  async getAvailability(packageId: string, dateValue: string) {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException({
        code: ERROR_CODES.INVALID_DATE,
        message: 'Invalid date',
      });
    }

    const healthPackage = await this.prisma.healthPackage.findUnique({
      where: { id: packageId },
      select: {
        id: true,
        name: true,
        clinicId: true,
        specialtyId: true,
        isActive: true,
        availabilities: {
          where: { dayOfWeek: date.getUTCDay(), isActive: true },
          take: 1,
        },
        clinic: {
          select: {
            workingHours: {
              where: { dayOfWeek: date.getUTCDay(), isOpen: true },
              take: 1,
            },
          },
        },
      },
    });

    if (!healthPackage || !healthPackage.isActive || !healthPackage.clinicId) {
      throw new NotFoundException({
        code: ERROR_CODES.PACKAGE_NOT_FOUND,
        message: 'Health package not found',
      });
    }

    const availability = healthPackage.availabilities[0];
    const clinicHour = healthPackage.clinic?.workingHours[0];
    const specialtySchedules = healthPackage.specialtyId
      ? await this.prisma.clinicSpecialtySchedule.findMany({
          where: {
            clinicId: healthPackage.clinicId,
            specialtyId: healthPackage.specialtyId,
            dayOfWeek: date.getUTCDay(),
            isActive: true,
          },
          orderBy: { startTime: 'asc' },
        })
      : [];
    const source = availability ?? specialtySchedules[0] ?? clinicHour;

    if (!source) {
      return this.emptyAvailability(packageId, dateValue);
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

    const bookedByTime = new Map<string, number>();
    try {
      if (this.prisma && (this.prisma as any).booking) {
        const bookings = await (this.prisma as any).booking.groupBy({
          by: ['bookingTime'],
          where: {
            packageId,
            bookingDate: date,
            status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
          },
          _count: { bookingTime: true },
        });
        for (const row of bookings) {
          bookedByTime.set(row.bookingTime, row._count.bookingTime);
        }
      } else {
        // If we are in the decoupled Admin microservice, fetch booked slots from the Backend/Appointment microservice
        let backendUrl = process.env.APPOINTMENT_SERVICE_URL || process.env.BACKEND_URL || 'http://localhost:8080';
        if (backendUrl.includes('healthcare-backend')) {
          backendUrl = backendUrl.replace('healthcare-backend', 'healthcare-appointment');
        }
        const res = await fetch(
          `${backendUrl}/v1/bookings/internal/package/${packageId}/booked-slots?date=${dateValue}`,
        );
        if (res.ok) {
          const bookingsData = await res.json();
          for (const row of bookingsData) {
            bookedByTime.set(row.bookingTime, row.count);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching package booked slots from backend service:', error);
    }
    const now = Date.now();
    const slotDetails = slots.map((slot) => {
      const slotDateTime = new Date(date);
      const [hoursRaw, minutesRaw] = slot.split(':');
      slotDateTime.setHours(Number(hoursRaw), Number(minutesRaw), 0, 0);
      const bookedCount = bookedByTime.get(slot) ?? 0;
      const isPast = slotDateTime.getTime() < now;
      const isFull = bookedCount >= capacity;

      return {
        time: slot,
        isAvailable: !isPast && !isFull,
        isPast,
        bookedCount,
        capacity,
        reason: isPast ? 'PAST' : isFull ? 'PACKAGE_SLOT_FULL' : null,
      };
    });

    return {
      packageId,
      date: dateValue,
      slotDurationMinutes,
      capacity,
      slots,
      availableSlots: slotDetails
        .filter((slot) => slot.isAvailable)
        .map((slot) => slot.time),
      slotDetails,
    };
  }

  private emptyAvailability(packageId: string, date: string) {
    return {
      packageId,
      date,
      slotDurationMinutes: 30,
      capacity: 0,
      slots: [],
      availableSlots: [],
      slotDetails: [],
    };
  }

  private serializePackage(item: {
    price: { toString(): string };
    promotionalPrice: { toString(): string } | null;
  }) {
    return {
      ...item,
      price: item.price.toString(),
      promotionalPrice: item.promotionalPrice?.toString() ?? null,
    };
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
}
