import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';
import { GetPerformanceListQuery } from './dto/request/get-performance-list.query';
import { GetPerformanceListResponse } from './dto/response/get-performance-list.response';

@ApiTags('Performance (공연)')
@Controller('/performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @ApiOperation({
    summary: '행사 목록 조회',
    description: 'TODO: 지역코드 추가',
  })
  @Get('/')
  async getPerformanceList(
    @Query() query: GetPerformanceListQuery,
  ): Promise<GetPerformanceListResponse> {
    const performanceList =
      await this.performanceService.getPerformanceList(query);

    return new GetPerformanceListResponse(performanceList);
  }

  @ApiOperation({
    summary: '행사 상세 조회',
    description: 'TODO: OpenAPI 연결',
  })
  @Get('/:performanceId')
  getPerformanceDetail() {}
}
