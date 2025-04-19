import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UpdatePasswordRequest } from './update-password.request';

export class SignInRequest extends UpdatePasswordRequest {
  @ApiProperty({
    description: '이메일',
    example: 'test@test.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
