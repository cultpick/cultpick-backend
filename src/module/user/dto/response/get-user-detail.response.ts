import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../enum';
import dayjs from 'dayjs';
import { UserWithUTCs } from '../../type';

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

  @ApiProperty({
    description: '관심 카테고리 ID 리스트',
    example: ['AAAA', 'BBBC'],
  })
  favoriteCategoryCodes: string[];

  constructor(user: UserWithUTCs) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.gender = user.gender as Gender;
    this.birthDate = user.birthDate;
    this.addressCode = user.addressCode;
    this.favoriteCategoryCodes = user.userToCategory.map(
      (userToCategory) => userToCategory.categoryCode,
    );
  }
}
