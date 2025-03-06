import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class DeletePickListRequest {
  @ApiProperty({
    description: '공연 ID 목록',
  })
  @IsNotEmpty()
  @IsArray()
  performanceIdList: string[];
}
