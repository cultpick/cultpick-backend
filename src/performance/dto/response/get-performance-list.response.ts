import { ApiProperty } from '@nestjs/swagger';
import { Performance } from 'src/common/open-api/schema/performance';
import { State } from 'src/performance/enum';

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
    description: '공연 장르명',
  })
  genreName: string;

  @ApiProperty({
    description: '공연 상태',
  })
  state: State;

  @ApiProperty({
    description: '공연 시작일',
  })
  startDate: string;

  @ApiProperty({
    description: '공연 종료일',
  })
  endDate: string;

  @ApiProperty({
    description: '공연 포스터 경로',
  })
  posterUrl: string;

  @ApiProperty({
    description: '공연 시설명 (공연장명) ',
  })
  placeName: string;

  @ApiProperty({
    description: '오픈런 여부',
  })
  isOpenRun: boolean;

  @ApiProperty({
    description: '공연 지역',
  })
  area: string;

  constructor(performance: Performance) {
    this.id = performance.mt20id;
    this.name = performance.prfnm;
    this.genreName = performance.genrenm;
    this.state =
      performance.prfstate === '공연예정'
        ? State.COMING
        : performance.prfstate === '공연중'
          ? State.ONGOING
          : State.END;
    this.startDate = performance.prfpdfrom.replace(/\./g, '');
    this.endDate = performance.prfpdto.replace(/\./g, '');
    this.posterUrl = performance.poster;
    this.placeName = performance.fcltynm;
    this.isOpenRun = performance.openrun === 'Y';
    this.area = performance.area;
  }
}

export class GetPerformanceListResponse {
  performanceList: GetPerformanceResponse[];

  constructor(performanceList: Performance[]) {
    this.performanceList = performanceList.map((performance) => {
      return new GetPerformanceResponse(performance);
    });
  }
}
