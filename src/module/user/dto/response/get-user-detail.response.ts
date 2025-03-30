import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Gender } from '../../enum';
import dayjs from 'dayjs';

export class GetUserDetailResponse {
  @ApiProperty({
    description: 'ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '이메일',
    example: 'kFb4R@example.com',
  })
  email: string;

  @ApiProperty({
    description: '이름',
    example: '홍길통',
  })
  name: string;

  @ApiProperty({
    description: '성별',
    example: Gender.MALE,
  })
  gender: Gender;

  @ApiProperty({
    description: '생년월일',
    example: dayjs().toISOString(),
  })
  birthDate: Date;

  @ApiProperty({
    description: '주소 코드',
    example: '5111',
  })
  addressCode: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.gender = user.gender as Gender;
    this.birthDate = user.birth;
    this.addressCode = user.addressCode;
  }
}
