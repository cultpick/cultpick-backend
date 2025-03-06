import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PickService } from './pick.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreatePickRequest } from './dto/request/create-pick.request';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { UserInfo } from 'src/auth/type';
import { CreatePickResponse } from './dto/response/create-pick.response';
import { DeletePickListRequest } from './dto/request/delete-pick.request';
import { DeletePickListResponse } from './dto/response/delete-pick-list.response';

@ApiTags('Pick (픽)')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('/pick')
export class PickController {
  constructor(private readonly pickService: PickService) {}

  @ApiOperation({
    summary: '픽 생성',
  })
  @Post('/')
  async createPick(
    @CurrentUser() user: UserInfo,
    @Body() body: CreatePickRequest,
  ): Promise<CreatePickResponse> {
    const createdPick = await this.pickService.createPick(user, body);

    return new CreatePickResponse(createdPick);
  }

  @ApiOperation({
    summary: '픽 목록 조회',
    // TODO: OpenAPI 활용하여 상세 정보 가져오기
  })
  @Get('/')
  async getPickList(@CurrentUser() user: UserInfo) {
    return await this.pickService.getPickList(user);
  }

  @ApiOperation({
    summary: '픽 목록 삭제',
  })
  @Delete('/')
  async deletePickList(
    @CurrentUser() user: UserInfo,
    @Body() body: DeletePickListRequest,
  ): Promise<DeletePickListResponse> {
    const deletedPerformanceIdList = await this.pickService.deletePickList(
      user,
      body,
    );

    return new DeletePickListResponse(deletedPerformanceIdList);
  }
}
