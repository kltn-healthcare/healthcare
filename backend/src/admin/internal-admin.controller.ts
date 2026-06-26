import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Body,
  Query,
  Patch,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../auth/decorators/public.decorator';

@Public()
@Controller({ path: 'admin/internal', version: '1' })
export class InternalAdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Patch('clinics/:id/rating')
  async updateClinicRating(
    @Param('id') id: string,
    @Body() body: { rating: number; reviewCount: number },
  ) {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!clinic) throw new NotFoundException('Clinic not found');

    return this.prisma.clinic.update({
      where: { id },
      data: {
        rating: body.rating,
        reviewCount: body.reviewCount,
      },
    });
  }

  @Get('clinics/:id')
  async getClinic(@Param('id') id: string) {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id },
      select: { id: true, name: true, address: true, isOpen: true },
    });
    if (!clinic) throw new NotFoundException('Clinic not found');
    return clinic;
  }

  @Get('doctors/:id')
  async getDoctor(@Param('id') id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      select: { id: true, name: true, clinicId: true, specialtyId: true },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  @Get('specialties/:id')
  async getSpecialty(@Param('id') id: string) {
    const specialty = await this.prisma.specialty.findUnique({
      where: { id },
      select: { id: true, name: true },
    });
    if (!specialty) throw new NotFoundException('Specialty not found');
    return specialty;
  }

  @Get('health-packages/:id')
  async getHealthPackage(@Param('id') id: string) {
    const pkg = await this.prisma.healthPackage.findUnique({
      where: { id },
      select: { id: true, name: true, price: true, clinicId: true, specialtyId: true, isActive: true },
    });
    if (!pkg) throw new NotFoundException('Health package not found');
    return pkg;
  }

  @Get('doctors/by-user/:userId')
  async getDoctorByUserId(@Param('userId') userId: string) {
    const doctor = await this.prisma.doctor.findFirst({
      where: { userId },
      select: { id: true, name: true, clinicId: true, specialtyId: true },
    });
    if (!doctor) throw new NotFoundException('Doctor profile not found');
    return doctor;
  }

  @Get('clinics/by-user/:userId')
  async getClinicByUserId(@Param('userId') userId: string) {
    const admin = await this.prisma.clinicAdmin.findUnique({
      where: { userId },
      select: { clinicId: true },
    });
    if (!admin) throw new NotFoundException('Clinic admin profile not found');
    const clinic = await this.prisma.clinic.findUnique({
      where: { id: admin.clinicId },
      select: { id: true, name: true, address: true },
    });
    if (!clinic) throw new NotFoundException('Clinic not found');
    return clinic;
  }

  @Get('clinic-admins/by-user/:userId')
  async getClinicAdminByUserId(@Param('userId') userId: string) {
    const admin = await this.prisma.clinicAdmin.findUnique({
      where: { userId },
      select: { id: true, clinicId: true },
    });
    if (!admin) throw new NotFoundException('Clinic admin not found');
    return admin;
  }

  @Post('resolve-batch')
  async resolveBatch(@Body() body: {
    clinicIds?: string[];
    doctorIds?: string[];
    specialtyIds?: string[];
    packageIds?: string[];
  }) {
    const { clinicIds = [], doctorIds = [], specialtyIds = [], packageIds = [] } = body;

    const [clinics, doctors, specialties, packages] = await Promise.all([
      clinicIds.length ? this.prisma.clinic.findMany({
        where: { id: { in: clinicIds } },
        select: { id: true, name: true, address: true },
      }) : [],
      doctorIds.length ? this.prisma.doctor.findMany({
        where: { id: { in: doctorIds } },
        select: { id: true, name: true },
      }) : [],
      specialtyIds.length ? this.prisma.specialty.findMany({
        where: { id: { in: specialtyIds } },
        select: { id: true, name: true },
      }) : [],
      packageIds.length ? this.prisma.healthPackage.findMany({
        where: { id: { in: packageIds } },
        select: { id: true, name: true, price: true },
      }) : [],
    ]);

    return {
      clinics: Object.fromEntries(clinics.map(c => [c.id, c])),
      doctors: Object.fromEntries(doctors.map(d => [d.id, d])),
      specialties: Object.fromEntries(specialties.map(s => [s.id, s])),
      packages: Object.fromEntries(packages.map(p => [p.id, p])),
    };
  }

  @Post('validate-slot')
  async validateSlot(@Body() body: {
    bookingType: string;
    clinicId: string;
    doctorId?: string;
    packageId?: string;
    specialtyId?: string;
    bookingDate: string;
    bookingTime: string;
  }) {
    const { bookingType, clinicId, doctorId, packageId, bookingDate, bookingTime } = body;
    let specialtyId = body.specialtyId;

    const date = new Date(bookingDate);
    const dayOfWeek = date.getUTCDay();

    // 1. Fetch clinic
    const clinic = await this.prisma.clinic.findUnique({
      where: { id: clinicId },
      select: { id: true, name: true, isOpen: true },
    });
    if (!clinic) {
      throw new BadRequestException({ code: 'INVALID_CLINIC', message: 'Invalid clinicId' });
    }
    if (!clinic.isOpen) {
      throw new BadRequestException({ code: 'CLINIC_CLOSED', message: 'Selected clinic is currently closed' });
    }

    let resolvedDoctorName: string | undefined;
    let resolvedPackageName: string | undefined;
    let resolvedPackagePrice: number | undefined;
    let resolvedSpecialtyName: string | undefined;
    let capacity = 1;

    // 2. Validate Doctor Booking
    if (bookingType === 'DOCTOR' || bookingType === 'DOCTOR_CONSULTATION') {
      if (!doctorId) {
        throw new BadRequestException({ code: 'INVALID_DOCTOR', message: 'doctorId is required' });
      }
      const doctor = await this.prisma.doctor.findUnique({
        where: { id: doctorId },
        select: { id: true, name: true, clinicId: true, specialtyId: true, qualifications: true },
      });
      if (!doctor || doctor.clinicId !== clinicId || (specialtyId && doctor.specialtyId !== specialtyId)) {
        throw new BadRequestException({ code: 'INVALID_DOCTOR', message: 'Invalid doctorId for this clinic' });
      }
      specialtyId = doctor.specialtyId;
      resolvedDoctorName = doctor.name;

      // Check slot availability in doctor's working hours
      const settings = this.extractDoctorAdminSettings(doctor.qualifications);
      const workingHours = (settings.workingHours ?? []).filter(
        (row: any) => row.dayOfWeek === dayOfWeek,
      );
      const specialtySchedules = await this.prisma.clinicSpecialtySchedule.findMany({
        where: {
          clinicId: doctor.clinicId,
          specialtyId: doctor.specialtyId,
          dayOfWeek,
          isActive: true,
        },
        orderBy: { startTime: 'asc' },
      });

      if (!workingHours.length || !specialtySchedules.length) {
        throw new BadRequestException({
          code: 'BOOKING_SLOT_UNAVAILABLE',
          message: 'Doctor is not available on this date',
        });
      }

      const slots = workingHours.flatMap((workingHour: any) =>
        specialtySchedules.flatMap((schedule) => {
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
        }),
      );

      if (!slots.includes(bookingTime)) {
        throw new BadRequestException({
          code: 'BOOKING_SLOT_UNAVAILABLE',
          message: 'This booking slot is outside doctor schedule',
        });
      }
    }

    // 3. Validate Package Booking
    if (bookingType === 'PACKAGE' || bookingType === 'HEALTH_PACKAGE') {
      if (!packageId) {
        throw new BadRequestException({ code: 'PACKAGE_NOT_FOUND', message: 'packageId is required' });
      }
      const healthPackage = await this.prisma.healthPackage.findUnique({
        where: { id: packageId },
        select: {
          id: true,
          name: true,
          price: true,
          clinicId: true,
          isActive: true,
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

      if (!healthPackage || !healthPackage.isActive || healthPackage.clinicId !== clinicId) {
        throw new BadRequestException({
          code: 'PACKAGE_NOT_FOUND',
          message: 'Invalid packageId for this clinic',
        });
      }

      specialtyId = healthPackage.specialtyId ?? specialtyId;
      resolvedPackageName = healthPackage.name;
      resolvedPackagePrice = Number(healthPackage.price);

      const availability = healthPackage.availabilities[0];
      const clinicHour = healthPackage.clinic?.workingHours[0];
      const specialtySchedules =
        healthPackage.clinicId && healthPackage.specialtyId
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

      const slotDurationMinutes = 'slotDurationMinutes' in source ? (source as any).slotDurationMinutes : 30;
      capacity = 'capacity' in source ? (source as any).capacity : 1;
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
    }

    // Resolve Specialty Name
    if (specialtyId) {
      const specialty = await this.prisma.specialty.findUnique({
        where: { id: specialtyId },
        select: { name: true },
      });
      resolvedSpecialtyName = specialty?.name;
    }

    return {
      valid: true,
      clinicName: clinic.name,
      doctorName: resolvedDoctorName,
      packageName: resolvedPackageName,
      packagePrice: resolvedPackagePrice,
      specialtyId,
      specialtyName: resolvedSpecialtyName,
      capacity,
    };
  }

  private extractDoctorAdminSettings(qualifications: any): any {
    if (!qualifications || typeof qualifications !== 'object' || Array.isArray(qualifications)) {
      return {};
    }
    const settings = qualifications.adminSettings;
    if (!settings || typeof settings !== 'object' || Array.isArray(settings)) {
      return {};
    }
    return settings;
  }

  private buildTimeSlots(startTime: string, endTime: string, slotMinutes: number) {
    const start = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(endTime);
    if (end <= start) return [];
    const slots: string[] = [];
    for (let cursor = start; cursor + slotMinutes <= end; cursor += slotMinutes) {
      slots.push(this.minutesToTime(cursor));
    }
    return slots;
  }

  private timeToMinutes(value: string) {
    const [hourRaw, minuteRaw] = value.split(':');
    return Number(hourRaw) * 60 + Number(minuteRaw);
  }

  private minutesToTime(totalMinutes: number): string {
    const hour = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
    const minute = (totalMinutes % 60).toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  @Post('clinic-admins')
  async createClinicAdmin(@Body() body: { userId: string; clinicId: string }) {
    return this.prisma.clinicAdmin.create({
      data: {
        userId: body.userId,
        clinicId: body.clinicId,
      },
    });
  }
}
