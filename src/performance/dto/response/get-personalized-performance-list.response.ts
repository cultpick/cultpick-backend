import { ApiProperty } from '@nestjs/swagger';
import { PerformanceWithPrice } from 'src/common/open-api/schema/performance';

export class GetPersonalizedPerformanceResponse {
  @ApiProperty({
    description: '공연 ID',
  })
  id: string;

  @ApiProperty({
    description: '공연명',
  })
  name: string;

  @ApiProperty({
    description: '공연 시작일',
  })
  startDate: string;

  @ApiProperty({
    description: '공연 종료일',
  })
  endDate: string;

  @ApiProperty({
    description: '공연 지역',
  })
  area: string;

  @ApiProperty({
    description: '공연 포스터 경로',
  })
  posterUrl: string;

  @ApiProperty({
    description: '티켓 가격',
  })
  price: string;

  constructor(performance: PerformanceWithPrice) {
    this.id = performance.mt20id;
    this.name = performance.prfnm;
    this.startDate = performance.prfpdfrom.replace(/\./g, '');
    this.endDate = performance.prfpdto.replace(/\./g, '');
    this.posterUrl = performance.poster;
    this.area = performance.area;
    this.price = performance.pcseguidance;
  }
}

export class GetPersonalizedPerformanceListResponse {
  @ApiProperty({
    description: '공연 목록 수',
  })
  count: number;

  @ApiProperty({
    description: '공연 목록',
  })
  performanceList: GetPersonalizedPerformanceResponse[];

  constructor(performanceList: PerformanceWithPrice[]) {
    this.count = performanceList.length;
    this.performanceList = performanceList.map((performance) => {
      return new GetPersonalizedPerformanceResponse(performance);
    });
  }
}
