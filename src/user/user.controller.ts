import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { UserInfo } from 'src/auth/type';

@ApiTags('User (유저)')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '내 정보 조회',
  })
  @Get()
  async getUser(@CurrentUser() user: UserInfo) {
    return await this.userService.getUser(user);
  }
}
