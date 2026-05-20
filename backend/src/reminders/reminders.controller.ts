import { Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { RemindersService } from './reminders.service';

@ApiTags('Internal Reminders')
@Controller({ path: 'internal/reminders', version: '1' })
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Public()
  @Post('run')
  run(@Headers('x-internal-token') token?: string) {
    this.remindersService.assertInternalToken(token);
    return this.remindersService.runDueReminders();
  }
}
