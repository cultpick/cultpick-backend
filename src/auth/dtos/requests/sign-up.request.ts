import { ApiProperty } from '@nestjs/swagger';
import { SignInRequest } from './sign-in.request';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpRequest extends SignInRequest {
  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
