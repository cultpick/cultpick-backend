import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator';

export class OffsetPaginationQuery {
  @ApiProperty({
    description: '페이지 번호 (1 ~)',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  page: number;

  @ApiProperty({
    description: '한 페이지의 크기 (1 ~ 100)',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  size: number;
}
