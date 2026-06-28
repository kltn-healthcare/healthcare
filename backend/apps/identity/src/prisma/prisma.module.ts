import { Global, Module } from '@nestjs/common';
import { PrismaService as RootPrismaService } from '../../../../src/prisma/prisma.service';
import { PrismaService as LocalPrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    LocalPrismaService,
    {
      provide: RootPrismaService,
      useExisting: LocalPrismaService,
    },
  ],
  exports: [LocalPrismaService, RootPrismaService],
})
export class PrismaModule {}
