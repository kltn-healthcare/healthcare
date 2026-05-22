import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { ClinicAdminService } from './clinic-admin.service';
import { CreateClinicPackageDto } from './dto/create-clinic-package.dto';
import { QueryClinicAdminBookingsDto } from './dto/query-clinic-admin-bookings.dto';
import { UpdateClinicBookingStatusDto } from './dto/update-clinic-booking-status.dto';
import { UpdateClinicPackageDto } from './dto/update-clinic-package.dto';
import { UpsertClinicWorkingHoursDto } from './dto/upsert-clinic-working-hours.dto';
import { UpsertPackageAvailabilityDto } from './dto/upsert-package-availability.dto';
import { UpsertSpecialtySchedulesDto } from './dto/upsert-specialty-schedules.dto';

import { UpdateClinicProfileDto } from './dto/update-clinic-profile.dto';

@ApiTags('Clinic Admin')
@ApiBearerAuth('JWT')
@Roles(UserRole.CLINIC_ADMIN)
@Controller({ path: 'clinic-admin', version: '1' })
export class ClinicAdminController {
  constructor(private readonly clinicAdminService: ClinicAdminService) {}

  @Get('profile')
  profile(@CurrentUser() user: JwtUser) {
    return this.clinicAdminService.profile(user.id);
  }

  @Patch('profile')
  updateProfile(
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateClinicProfileDto,
  ) {
    return this.clinicAdminService.updateProfile(user.id, dto);
  }

  @Put('working-hours')
  upsertWorkingHours(
    @CurrentUser() user: JwtUser,
    @Body() dto: UpsertClinicWorkingHoursDto,
  ) {
    return this.clinicAdminService.upsertWorkingHours(user.id, dto);
  }

  @Put('specialties/:id/schedules')
  upsertSpecialtySchedules(
    @CurrentUser() user: JwtUser,
    @Param('id') specialtyId: string,
    @Body() dto: UpsertSpecialtySchedulesDto,
  ) {
    return this.clinicAdminService.upsertSpecialtySchedules(
      user.id,
      specialtyId,
      dto,
    );
  }

  @Post('packages')
  createPackage(
    @CurrentUser() user: JwtUser,
    @Body() dto: CreateClinicPackageDto,
  ) {
    return this.clinicAdminService.createPackage(user.id, dto);
  }

  @Patch('packages/:id')
  updatePackage(
    @CurrentUser() user: JwtUser,
    @Param('id') packageId: string,
    @Body() dto: UpdateClinicPackageDto,
  ) {
    return this.clinicAdminService.updatePackage(user.id, packageId, dto);
  }

  @Put('packages/:id/availability')
  upsertPackageAvailability(
    @CurrentUser() user: JwtUser,
    @Param('id') packageId: string,
    @Body() dto: UpsertPackageAvailabilityDto,
  ) {
    return this.clinicAdminService.upsertPackageAvailability(
      user.id,
      packageId,
      dto,
    );
  }

  @Get('bookings')
  bookings(
    @CurrentUser() user: JwtUser,
    @Query() query: QueryClinicAdminBookingsDto,
  ) {
    return this.clinicAdminService.bookings(user.id, query);
  }

  @Patch('bookings/:id/status')
  updateBookingStatus(
    @CurrentUser() user: JwtUser,
    @Param('id') bookingId: string,
    @Body() dto: UpdateClinicBookingStatusDto,
  ) {
    return this.clinicAdminService.updateBookingStatus(user.id, bookingId, dto);
  }
}
