import { ApiProperty } from '@nestjs/swagger';
import { PerformanceDetail } from 'src/common/open-api/schema/performance';
import dayjs from 'dayjs';

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
  posterImageUrl: string;

  constructor(performance: PerformanceDetail) {
    this.id = performance.mt20id;
    this.name = performance.prfnm;
    this.startDate = dayjs(performance.prfpdfrom, 'DD.MM.YYYY').toDate();
    this.endDate = dayjs(performance.prfpdto, 'DD.MM.YYYY').toDate();
    this.area = performance.area;
    this.price = performance.pcseguidance;
    this.posterImageUrl = performance.poster;
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

  constructor(performanceList: PerformanceDetail[]) {
    this.count = performanceList.length;
    this.performanceList = performanceList.map((performance) => {
      return new GetPerformanceResponse(performance);
    });
  }
}
