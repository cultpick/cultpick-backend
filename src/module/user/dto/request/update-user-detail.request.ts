import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../enum';
import dayjs from 'dayjs';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDetailRequest {
  @ApiProperty({ example: '홍길통' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: Gender.MALE })
  @IsNotEmpty()
  @IsString()
  gender: Gender;

  @ApiProperty({ example: dayjs().toISOString() })
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @ApiProperty({ example: '5111' })
  @IsNotEmpty()
  @IsString()
  addressCode: string;
}
