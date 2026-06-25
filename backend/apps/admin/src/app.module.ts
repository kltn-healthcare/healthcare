import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import {
  RedisModule,
  MailModule,
  JwtAuthGuard,
  RolesGuard,
  AuthCommonModule,
} from '@app/common';

// Business modules owned by Admin database
import { ClinicsModule } from '../../../src/clinics/clinics.module';
import { DoctorsModule } from '../../../src/doctors/doctors.module';
import { SpecialtiesModule } from '../../../src/specialties/specialties.module';
import { ArticlesModule } from '../../../src/articles/articles.module';
import { PackagesModule } from '../../../src/packages/packages.module';
import { AdminModule as CoreAdminModule } from '../../../src/admin/admin.module';
import { DoctorAdminModule } from '../../../src/doctor-admin/doctor-admin.module';
import { ClinicAdminModule } from '../../../src/clinic-admin/clinic-admin.module';
import { UploadModule } from '../../../src/upload/upload.module';
import { HealthModule } from '../../../src/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    MailModule,
    AuthCommonModule,
    HealthModule,
    ClinicsModule,
    DoctorsModule,
    SpecialtiesModule,
    ArticlesModule,
    PackagesModule,
    CoreAdminModule,
    DoctorAdminModule,
    ClinicAdminModule,
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
