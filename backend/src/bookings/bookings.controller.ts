import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RescheduleBookingDto } from './dto/reschedule-booking.dto';
import { BookingsService } from './bookings.service';


@ApiTags('Bookings')
@ApiBearerAuth('JWT')
@Controller({ path: 'bookings', version: '1' })
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@CurrentUser() user: JwtUser, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(user.id, dto);
  }

  @Get('me')
  myBookings(@CurrentUser() user: JwtUser) {
    return this.bookingsService.myBookings(user.id);
  }

  @Get(':id')
  detail(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.bookingsService.getMyBookingById(user.id, id);
  }

  @Patch(':id/cancel')
  cancel(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() dto: CancelBookingDto,
  ) {
    return this.bookingsService.cancelByPatient(user.id, id, dto);
  }

  @Patch(':id/reschedule')
  reschedule(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string,
    @Body() dto: RescheduleBookingDto,
  ) {
    return this.bookingsService.rescheduleByPatient(user.id, id, dto);
  }

  @Public()
  @Get('internal/doctor/:doctorId/booked-slots')
  getBookedSlots(
    @Param('doctorId') doctorId: string,
    @Query('date') date: string,
  ) {
    return this.bookingsService.getBookedSlotsInternal(doctorId, date);
  }

  @Public()
  @Get('internal/package/:packageId/booked-slots')
  getPackageBookedSlots(
    @Param('packageId') packageId: string,
    @Query('date') date: string,
  ) {
    return this.bookingsService.getPackageBookedSlotsInternal(packageId, date);
  }

  @Public()
  @Get('internal/doctor-bookings')
  doctorGetBookings(
    @Query('userId') userId: string,
    @Query() query: any,
  ) {
    return this.bookingsService.doctorGetBookings(userId, query);
  }

  @Public()
  @Patch('internal/doctor-bookings/:id/status')
  doctorUpdateBookingStatus(
    @Query('userId') userId: string,
    @Param('id') id: string,
    @Body() dto: any,
  ) {
    return this.bookingsService.doctorUpdateBookingStatus(userId, id, dto);
  }

  @Public()
  @Get('internal/clinic-bookings')
  clinicGetBookings(
    @Query('userId') userId: string,
    @Query() query: any,
  ) {
    return this.bookingsService.clinicGetBookings(userId, query);
  }

  @Public()
  @Patch('internal/clinic-bookings/:id/status')
  clinicUpdateBookingStatus(
    @Query('userId') userId: string,
    @Param('id') id: string,
    @Body() dto: any,
  ) {
    return this.bookingsService.clinicUpdateBookingStatus(userId, id, dto);
  }
}
