import { Module } from '@nestjs/common';
import { NotificationsModule } from '../notifications/notifications.module';
import { ClinicAdminController } from './clinic-admin.controller';
import { ClinicAdminService } from './clinic-admin.service';

@Module({
  imports: [NotificationsModule],
  controllers: [ClinicAdminController],
  providers: [ClinicAdminService],
})
export class ClinicAdminModule {}
