import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RescheduleBookingDto } from './dto/reschedule-booking.dto';
import { BookingsService } from './bookings.service';

@ApiTags('Bookings')
@ApiBearerAuth('JWT')
@Controller({ path: 'bookings', version: '1' })
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

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
}

