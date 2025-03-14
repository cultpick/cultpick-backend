import { ApiProperty } from '@nestjs/swagger';
import { Pick } from '@prisma/client';

export class CreatePickResponse {
  @ApiProperty({
    description: '유저 ID',
  })
  userId: number;

  @ApiProperty({
    description: '공연 ID',
  })
  performanceId: string;

  constructor(pick: Pick) {
    this.userId = pick.userId;
    this.performanceId = pick.performanceId;
  }
}
