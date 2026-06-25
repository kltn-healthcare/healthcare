import { Body, Controller, Get, Patch, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@app/common';
import type { JwtUser } from '@app/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@CurrentUser() user: JwtUser) {
    return this.usersService.getById(user.id);
  }

  @Patch('me')
  updateProfile(@CurrentUser() user: JwtUser, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, dto);
  }

  // Internal endpoint for other microservices (e.g. Appointment Service)
  @Public()
  @Get('internal/:id')
  internalGetById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Public()
  @Patch('internal/:id')
  internalUpdate(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(id, dto);
  }

  @Public()
  @Post('internal/resolve-batch')
  internalResolveBatch(@Body() body: { userIds: string[] }) {
    return this.usersService.resolveBatch(body.userIds || []);
  }
}
