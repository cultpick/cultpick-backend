import { OmitType } from '@nestjs/swagger';
import { SignUpRequest } from 'src/auth/dto/request/sign-up.request';

export class UpdateUserDetailRequest extends OmitType(SignUpRequest, [
  'email',
  'password',
] as const) {}
