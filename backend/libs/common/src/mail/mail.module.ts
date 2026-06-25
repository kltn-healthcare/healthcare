import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailService as MonolithMailService } from '../../../../src/common/mail/mail.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    MailService,
    {
      provide: MonolithMailService,
      useExisting: MailService,
    },
  ],
  exports: [MailService, MonolithMailService],
})
export class MailModule {}
