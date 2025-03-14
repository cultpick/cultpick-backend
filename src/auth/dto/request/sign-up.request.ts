import { ApiProperty } from '@nestjs/swagger';
import { SignInRequest } from './sign-in.request';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from 'src/modules/user/enum';

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
    description: '주소(구군) 코드',
    example: '5111',
  })
  @IsNotEmpty()
  @IsString()
  addressCode: string;

  @ApiProperty({
    description: '관심 카테고리 ID 리스트',
    example: ['AAAA', 'BBBC'],
  })
  @IsNotEmpty()
  @IsString({ each: true })
  favoriteCategoryCodes: string[];
}
