import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PickService } from './pick.service';
import { AccessTokenBearerGuard } from 'src/auth/guard/access-token-bearer.guard';
import { CreatePickRequest } from './dto/request/create-pick.request';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { UserInfo } from 'src/auth/type';
import { CreatePickResponse } from './dto/response/create-pick.response';
import { DeletePickListRequest } from './dto/request/delete-pick.request';
import { DeletePickListResponse } from './dto/response/delete-pick-list.response';
import { GetPerformanceListResponse } from '../performance/dto/response/get-performance-list.response';

@ApiTags('Pick (픽)')
@ApiBearerAuth('jwt')
@UseGuards(AccessTokenBearerGuard)
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
  })
  @Get('/')
  async getPickList(
    @CurrentUser() user: UserInfo,
  ): Promise<GetPerformanceListResponse> {
    const pickList = await this.pickService.getPickList(user);
    return new GetPerformanceListResponse(pickList);
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
