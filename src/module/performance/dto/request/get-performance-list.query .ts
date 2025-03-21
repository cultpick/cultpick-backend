import { ApiPropertyOptional } from '@nestjs/swagger';
import { OffsetPaginationQuery } from 'src/common/dto/request/get-offset-pagination.query';
import { PerformanceState } from '../../enum';

export class GetSearchedPerformanceListQuery extends OffsetPaginationQuery {
  @ApiPropertyOptional({
    description: '검색 내용',
  })
  q?: string;

  @ApiPropertyOptional({
    description: '장르 코드',
  })
  genreCode?: string;

  @ApiPropertyOptional({
    description: '진행 상태',
    enum: PerformanceState,
  })
  state?: PerformanceState;

  @ApiPropertyOptional({
    description: '지역 (시도) 코드',
  })
  areaCode?: string;

  @ApiPropertyOptional({
    description: '지역 (구군) 코드',
  })
  subAreaCode?: string;
}
