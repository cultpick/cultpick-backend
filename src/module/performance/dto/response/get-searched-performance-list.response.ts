import { ApiProperty } from '@nestjs/swagger';
import { PerformanceDetail } from 'src/common/open-api/schema/performance';
import { GetPerformanceListResponse } from './get-performance-list.response';

export class GetSearchedPerformanceResponse extends GetPerformanceListResponse {
  @ApiProperty({
    description: '공연 상세 정보',
  })
  totalCount: number;

  constructor(totalCount: number, performanceList: PerformanceDetail[]) {
    super(performanceList);
    this.totalCount = totalCount;
  }
}
