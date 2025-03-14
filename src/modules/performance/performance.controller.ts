import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';
import { GetRecommendedPerformanceListQuery } from './dto/request/get-recommended-performance-list.query';
import { GetOngoingPerformanceListQuery } from './dto/request/get-ongoing-performance-list.query';
import { GetRecommendedPerformanceListResponse } from './dto/response/get-recommended-performance-list.response';
import { GetOngoingPerformanceListResponse } from './dto/response/get-ongoing-performance-list.response';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { UserInfo } from 'src/auth/type';
import { GetPersonalizedPerformanceListQuery } from './dto/request/get-personalized-performance-list.query';
import { GetPersonalizedPerformanceListResponse } from './dto/response/get-personalized-performance-list.response';

@ApiTags('[Open API] Performance (공연)')
@ApiBearerAuth('access-token')
@Controller('/performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @ApiOperation({
    summary: '이달의 추천 공연 목록 조회',
  })
  @Get('/recommended')
  async getRecommendedPerformanceList(
    @Query() query: GetRecommendedPerformanceListQuery,
  ): Promise<GetRecommendedPerformanceListResponse> {
    const performanceList =
      await this.performanceService.getRecommendedPerformanceList(query);

    return new GetRecommendedPerformanceListResponse(performanceList);
  }

  @ApiOperation({
    summary: '(개발중) 개인화 공연 목록 조회',
    description: 'TODO: 내부 로직 구현',
  })
  @UseGuards(JwtGuard)
  @Get('/personalized')
  async getPersonalizedPerformanceList(
    @CurrentUser() user: UserInfo,
    @Query() query: GetPersonalizedPerformanceListQuery,
  ) {
    const performanceList =
      await this.performanceService.getPersonalizedPerformanceList(user, query);

    return new GetPersonalizedPerformanceListResponse(performanceList);
  }

  @ApiOperation({
    summary: '진행중 공연 목록 조회',
  })
  @Get('/ongoing')
  async getOngoingPerformanceList(
    @Query() query: GetOngoingPerformanceListQuery,
  ) {
    const performanceList =
      await this.performanceService.getOngoingPerformanceList(query);

    return new GetOngoingPerformanceListResponse(performanceList);
  }
}
