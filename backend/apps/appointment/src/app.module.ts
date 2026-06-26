import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from './prisma/prisma.module';
import {
  RedisModule,
  MailModule,
  JwtAuthGuard,
  RolesGuard,
  AuthCommonModule,
} from '@app/common';

// Business modules
import { BookingsModule } from '../../../src/bookings/bookings.module';
import { ReviewsModule } from '../../../src/reviews/reviews.module';
import { RemindersModule } from '../../../src/reminders/reminders.module';
import { HealthModule } from '../../../src/health/health.module';
import { DynamoAppointmentsModule } from '../../../src/aws/dynamo-appointments.module';
import { UploadModule } from '../../../src/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    RedisModule,
    MailModule,
    AuthCommonModule,
    HealthModule,
    BookingsModule,
    ReviewsModule,
    RemindersModule,
    DynamoAppointmentsModule,
    UploadModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
