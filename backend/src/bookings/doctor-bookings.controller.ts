import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { CurrentUser } from '@app/common';
import type { JwtUser } from '@app/common';
import { QueryDoctorBookingsDto } from '../doctor-admin/dto/query-doctor-bookings.dto';
import { UpdateDoctorBookingStatusDto } from '../doctor-admin/dto/update-doctor-booking-status.dto';
import { BookingsService } from './bookings.service';

@Controller({ path: 'doctor-admin/bookings', version: '1' })
export class DoctorBookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  myBookings(
    @CurrentUser() user: JwtUser,
    @Query() query: QueryDoctorBookingsDto,
  ) {
    return this.bookingsService.doctorGetBookings(user.id, query);
  }

  @Patch(':id/status')
  updateBookingStatus(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() dto: UpdateDoctorBookingStatusDto,
  ) {
    return this.bookingsService.doctorUpdateBookingStatus(user.id, id, dto);
  }
}
