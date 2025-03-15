import { ApiProperty } from '@nestjs/swagger';

export class DeletePickListResponse {
  @ApiProperty({
    description: '공연 ID 목록',
  })
  performanceIdList: string[];

  constructor(performanceIdList: string[]) {
    this.performanceIdList = performanceIdList;
  }
}
