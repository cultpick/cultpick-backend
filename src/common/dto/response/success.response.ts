import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty({
    description: '성공',
  })
  success: boolean;

  constructor() {
    this.success = true;
  }
}
