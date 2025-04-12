import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateVerificationCodeRequest {
  @ApiProperty({ description: '이메일', example: 'test@test.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: '인증번호', example: '1234' })
  @IsNotEmpty()
  @IsString()
  code: string;
}
