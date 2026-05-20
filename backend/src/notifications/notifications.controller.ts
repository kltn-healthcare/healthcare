import { Body, Controller, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { RegisterDeviceTokenDto } from './dto/register-device-token.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth('JWT')
@Controller({ path: 'notifications', version: '1' })
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('device-tokens')
  registerDeviceToken(
    @CurrentUser() user: JwtUser,
    @Body() dto: RegisterDeviceTokenDto,
    @Headers('user-agent') userAgent?: string,
  ) {
    return this.notificationsService.registerDeviceToken(user.id, {
      ...dto,
      userAgent: dto.userAgent || userAgent,
    });
  }

  @Get()
  list(@CurrentUser() user: JwtUser) {
    return this.notificationsService.list(user.id);
  }

  @Patch(':id/read')
  markRead(@CurrentUser() user: JwtUser, @Param('id') id: string) {
    return this.notificationsService.markRead(user.id, id);
  }

  @Patch('read-all')
  markAllRead(@CurrentUser() user: JwtUser) {
    return this.notificationsService.markAllRead(user.id);
  }
}
