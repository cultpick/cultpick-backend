import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';
import { GetRecommendedPerformanceListQuery } from './dto/request/get-recommended-performance-list.query';
import { GetOngoingPerformanceListQuery } from './dto/request/get-ongoing-performance-list.query';
import { GetRecommendedPerformanceListResponse } from './dto/response/get-recommended-performance-list.response';
import { GetOngoingPerformanceListResponse } from './dto/response/get-ongoing-performance-list.response';

@ApiTags('[OpenAPI] Performance (공연)')
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
