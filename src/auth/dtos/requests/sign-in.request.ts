import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInRequest {
  @ApiProperty({
    description: '아이디',
    example: 'test',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'pass',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
