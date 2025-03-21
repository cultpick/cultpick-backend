import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CheckEmailRequest {
  @ApiProperty({
    description: '이메일',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
