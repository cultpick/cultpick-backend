import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';
import { GetRecommendedPerformanceListQuery } from './dto/request/get-recommended-performance-list.query';
import { GetOngoingPerformanceListQuery } from './dto/request/get-ongoing-performance-list.query';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { UserInfo } from 'src/auth/type';
import { GetPersonalizedPerformanceListQuery } from './dto/request/get-personalized-performance-list.query';
import { GetPerformanceListResponse } from './dto/response/get-performance-list.response';
import { GetSearchedPerformanceListQuery } from './dto/request/get-performance-list.query ';
import { GetSearchedPerformanceResponse } from './dto/response/get-searched-performance-list.response';

@ApiTags('Performance (공연)')
@ApiBearerAuth('access-token')
@Controller('/performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @ApiOperation({
    summary: '공연 목록 검색 조회',
  })
  @Get('/')
  async getSearchedPerformanceList(
    @Query() query: GetSearchedPerformanceListQuery,
  ): Promise<GetSearchedPerformanceResponse> {
    const { totalCount, performanceList } =
      await this.performanceService.getSearchedPerformanceList(query);

    return new GetSearchedPerformanceResponse(totalCount, performanceList);
  }

  @ApiOperation({
    summary: '이달의 추천 공연 목록 조회',
  })
  @Get('/recommended')
  async getRecommendedPerformanceList(
    @Query() query: GetRecommendedPerformanceListQuery,
  ): Promise<GetPerformanceListResponse> {
    const performanceList =
      await this.performanceService.getRecommendedPerformanceList(query);

    return new GetPerformanceListResponse(performanceList);
  }

  @ApiOperation({
    summary: '개인화 공연 목록 조회',
  })
  @UseGuards(JwtGuard)
  @Get('/personalized')
  async getPersonalizedPerformanceList(
    @CurrentUser() user: UserInfo,
    @Query() query: GetPersonalizedPerformanceListQuery,
  ): Promise<GetPerformanceListResponse> {
    const performanceList =
      await this.performanceService.getPersonalizedPerformanceList(user, query);

    return new GetPerformanceListResponse(performanceList);
  }

  @ApiOperation({
    summary: '진행중 공연 목록 조회',
  })
  @Get('/ongoing')
  async getOngoingPerformanceList(
    @Query() query: GetOngoingPerformanceListQuery,
  ): Promise<GetPerformanceListResponse> {
    const performanceList =
      await this.performanceService.getOngoingPerformanceList(query);

    return new GetPerformanceListResponse(performanceList);
  }
}
