import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { InternalAdminController } from './internal-admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController, InternalAdminController],
  providers: [AdminService],
})
export class AdminModule {}
