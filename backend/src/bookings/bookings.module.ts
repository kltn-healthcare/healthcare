import { Module } from '@nestjs/common';
import { DynamoAppointmentsModule } from '../aws/dynamo-appointments.module';
import { BookingsController } from './bookings.controller';
import { DoctorBookingsController } from './doctor-bookings.controller';
import { ClinicBookingsController } from './clinic-bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [DynamoAppointmentsModule],
  controllers: [
    BookingsController,
    DoctorBookingsController,
    ClinicBookingsController,
  ],
  providers: [BookingsService],
})
export class BookingsModule {}
