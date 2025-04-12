import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendVerificationCodeEmailQuery {
  @ApiProperty({ description: '이메일', example: 'test@test.com' })
  @IsNotEmpty()
  @IsString()
  email: string;
}
