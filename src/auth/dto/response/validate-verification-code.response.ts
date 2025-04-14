import { ApiProperty } from '@nestjs/swagger';

export class ValidateVerificationCodeResponse {
  @ApiProperty({ description: 'SignUpToken', example: 'SignUpToken' })
  signUpToken: string;

  constructor(signUpToken: string) {
    this.signUpToken = signUpToken;
  }
}
