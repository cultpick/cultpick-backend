import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class GetEventListQuery {
  @ApiProperty({
    description: '공연시작일자',
    format: 'date',
    example: '20250101',
  })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: '공연종료일자',
    format: 'date',
    example: '20250131',
  })
  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}
