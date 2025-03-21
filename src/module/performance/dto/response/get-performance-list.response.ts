import { ApiProperty } from '@nestjs/swagger';
import { PerformanceWithPrice } from 'src/common/open-api/schema/performance';
import * as dayjs from 'dayjs';

export class GetPerformanceResponse {
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
  startDate: Date;

  @ApiProperty({
    description: '공연 종료일',
  })
  endDate: Date;

  @ApiProperty({
    description: '공연 지역',
  })
  area: string;

  @ApiProperty({
    description: '티켓 가격',
  })
  price: string;

  @ApiProperty({
    description: '공연 포스터 경로',
  })
  posterUrl: string;

  constructor(performance: PerformanceWithPrice) {
    console.log(performance);
    this.id = performance.mt20id;
    this.name = performance.prfnm;
    this.startDate = dayjs(performance.prfpdfrom, 'DD.MM.YYYY').toDate();
    this.endDate = dayjs(performance.prfpdto, 'DD.MM.YYYY').toDate();
    this.area = performance.area;
    this.price = performance.pcseguidance;
    this.posterUrl = performance.poster;
  }
}

export class GetPerformanceListResponse {
  @ApiProperty({
    description: '공연 목록 수',
  })
  count: number;

  @ApiProperty({
    description: '공연 목록',
  })
  performanceList: GetPerformanceResponse[];

  constructor(performanceList: PerformanceWithPrice[]) {
    this.count = performanceList.length;
    this.performanceList = performanceList.map((performance) => {
      return new GetPerformanceResponse(performance);
    });
  }
}
