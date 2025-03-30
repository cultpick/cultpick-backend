import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { UserInfo } from 'src/auth/type';
import { GetUserDetailResponse } from './dto/response/get-user-detail.response';
import { UpdateUserDetailRequest } from './dto/request/update-user-detail.request';
import { SuccessResponse } from 'src/common/dto/response/success.response';

@ApiTags('User (유저)')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '유저 상세 조회',
  })
  @Get('/')
  async getUserDetail(
    @CurrentUser() userInfo: UserInfo,
  ): Promise<GetUserDetailResponse> {
    const user = await this.userService.getUserDetail(userInfo);

    return new GetUserDetailResponse(user);
  }

  @ApiOperation({
    summary: '유저 상세 수정',
  })
  @Put('/')
  async updateUserDetail(
    @CurrentUser() userInfo: UserInfo,
    @Body() body: UpdateUserDetailRequest,
  ): Promise<SuccessResponse> {
    await this.userService.updateUserDetail(userInfo, body);

    return new SuccessResponse();
  }

  @ApiOperation({
    summary: '유저 삭제',
  })
  @Delete('/')
  async deleteUser(
    @CurrentUser() userInfo: UserInfo,
  ): Promise<SuccessResponse> {
    await this.userService.deleteUser(userInfo);

    return new SuccessResponse();
  }
}
