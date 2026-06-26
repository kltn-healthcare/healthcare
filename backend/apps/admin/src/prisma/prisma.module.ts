import { Global, Module } from '@nestjs/common';
import { PrismaService as RootPrismaService } from '../../../../src/prisma/prisma.service';
import { PrismaService as LocalPrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    {
      provide: RootPrismaService,
      useClass: LocalPrismaService,
    },
  ],
  exports: [RootPrismaService],
})
export class PrismaModule {}
