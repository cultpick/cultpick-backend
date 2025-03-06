import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePickRequest {
  @ApiProperty({
    description: '공연 ID',
  })
  @IsNotEmpty()
  @IsString()
  performanceId: string;
}
