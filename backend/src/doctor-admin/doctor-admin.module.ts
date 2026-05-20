import { Module } from '@nestjs/common';
import { DynamoAppointmentsModule } from '../aws/dynamo-appointments.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { DoctorAdminController } from './doctor-admin.controller';
import { DoctorAdminService } from './doctor-admin.service';

@Module({
  imports: [DynamoAppointmentsModule, NotificationsModule],
  controllers: [DoctorAdminController],
  providers: [DoctorAdminService],
})
export class DoctorAdminModule {}
