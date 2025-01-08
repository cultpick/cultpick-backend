import { ApiProperty } from '@nestjs/swagger';
import { SignInRequest } from './sign-in.request';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from 'src/user/enum';

export class SignUpRequest extends SignInRequest {
  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: '성별',
    example: Gender.MALE,
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: '생년월일',
    example: '2000-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDate()
  birth: Date;

  @ApiProperty({
    description: '주소',
    example: '서울',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
