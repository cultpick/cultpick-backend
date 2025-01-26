import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';
import { GetPerformanceListQuery } from './dto/request/get-recommended-performance-list.query';
import { GetRecommendedPerformanceListResponse } from './dto/response/get-recommended-performance-list.response';

@ApiTags('[OpenAPI] Performance (공연)')
@Controller('/performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @ApiOperation({
    summary: '추천 공연 목록 조회',
  })
  @Get('/')
  async getRecommendedPerformanceList(
    @Query() query: GetPerformanceListQuery,
  ): Promise<GetRecommendedPerformanceListResponse> {
    const performanceList =
      await this.performanceService.getRecommendedPerformanceList(query);

    return new GetRecommendedPerformanceListResponse(performanceList);
  }
}
