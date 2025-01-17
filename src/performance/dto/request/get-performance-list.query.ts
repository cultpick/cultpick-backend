import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OffsetPaginationQuery } from 'src/common/dto/request/get-offset-pagination.query';
import { Genre } from 'src/performance/enum';

export class GetPerformanceListQuery extends OffsetPaginationQuery {
  @ApiProperty({
    description: '공연시작일자',
    example: '20250101',
  })
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @ApiProperty({
    description: '공연종료일자',
    example: '20250131',
  })
  @IsNotEmpty()
  @IsString()
  endDate: string;

  @ApiPropertyOptional({
    description: '장르 종류',
    example: Genre.THEATER,
  })
  @IsOptional()
  @IsEnum(Genre)
  genre?: Genre;

  @ApiPropertyOptional({
    description: '공연명',
    example: '사랑',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: '공연시설명',
    example: '예술의전당',
  })
  @IsOptional()
  @IsString()
  placeName?: string;

  @ApiPropertyOptional({
    description: '아동공연여부',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isForChild?: boolean;

  @ApiPropertyOptional({
    description: '키워드',
    example: '사랑',
  })
  @IsOptional()
  @IsString()
  keyword?: string;
}
