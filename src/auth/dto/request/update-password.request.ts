import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordRequest {
  @ApiProperty({
    description: '비밀번호',
    example: 'pass',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
