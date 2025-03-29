import { ApiProperty } from '@nestjs/swagger';
import dayjs from 'dayjs';
import { PerformanceDetail } from 'src/common/open-api/schema/performance';

export class TicketResponse {
  @ApiProperty({
    description: '예매처 이름',
  })
  name: string;

  @ApiProperty({
    description: '예매처 URL',
  })
  url: string;
}

export class GetPerformanceDetailResponse {
  @ApiProperty({
    description: '공연 ID',
  })
  id: string;

  @ApiProperty({
    description: '공연명',
  })
  name: string;

  @ApiProperty({
    description: '공연 장르',
  })
  genre: string;

  @ApiProperty({
    description: '공연 진행 상태',
  })
  state: string;

  @ApiProperty({
    description: '공연 지역',
  })
  area: string;

  @ApiProperty({
    description: '예매처 목록',
  })
  ticketList: TicketResponse[];

  @ApiProperty({
    description: '공연 시작일',
  })
  startDate: Date;

  @ApiProperty({
    description: '공연 종료일',
  })
  endDate: Date;

  @ApiProperty({
    description: '티켓 가격',
  })
  price: string;

  @ApiProperty({
    description: '공연 장소',
  })
  address: string;

  @ApiProperty({
    description: '공연 개최자',
  })
  host: string;

  @ApiProperty({
    description: '공연 포스터 URL',
  })
  posterImageUrl: string;

  @ApiProperty({
    description: '공연 소개 이미지 URL',
  })
  introImageUrlList: string[];

  constructor(performance: PerformanceDetail) {
    console.log(performance);
    this.id = performance.mt20id;
    this.name = performance.prfnm;
    this.genre = performance.genrenm;
    this.state = performance.prfstate;
    this.area = performance.area;
    const ticketList = [];
    for (const entry of Object.values(performance.relates)) {
      if (Array.isArray(entry)) {
        for (const item of entry) {
          ticketList.push({
            name: item.relatenm,
            url: item.relateurl,
          });
        }
      } else {
        ticketList.push({
          name: entry.relatenm,
          url: entry.relateurl,
        });
      }
    }
    this.ticketList = ticketList;
    this.startDate = dayjs(performance.prfpdfrom, 'DD.MM.YYYY').toDate();
    this.endDate = dayjs(performance.prfpdto, 'DD.MM.YYYY').toDate();
    this.price = performance.pcseguidance;
    this.address = performance.fcltynm;
    this.host = performance.entrpsnmH;
    this.posterImageUrl = performance.poster;
    this.introImageUrlList = Object.values(performance.styurls);
  }
}
