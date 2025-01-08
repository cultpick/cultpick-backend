import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInRequest {
  @ApiProperty({
    description: '이메일',
    example: 'test@test.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'pass',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
