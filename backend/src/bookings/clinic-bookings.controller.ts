import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { CurrentUser } from '@app/common';
import type { JwtUser } from '@app/common';
import { QueryClinicAdminBookingsDto } from '../clinic-admin/dto/query-clinic-admin-bookings.dto';
import { UpdateClinicBookingStatusDto } from '../clinic-admin/dto/update-clinic-booking-status.dto';
import { BookingsService } from './bookings.service';

@Controller({ path: 'clinic-admin/bookings', version: '1' })
export class ClinicBookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  bookings(
    @CurrentUser() user: JwtUser,
    @Query() query: QueryClinicAdminBookingsDto,
  ) {
    return this.bookingsService.clinicGetBookings(user.id, query);
  }

  @Patch(':id/status')
  updateBookingStatus(
    @CurrentUser() user: JwtUser,
    @Param('id') bookingId: string,
    @Body() dto: UpdateClinicBookingStatusDto,
  ) {
    return this.bookingsService.clinicUpdateBookingStatus(user.id, bookingId, dto);
  }
}
