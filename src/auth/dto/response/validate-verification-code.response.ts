import { ApiProperty } from '@nestjs/swagger';

export class ValidateVerificationCodeResponse {
  @ApiProperty({
    description: 'VerificationToken',
    example: 'VerificationToken',
  })
  verificationToken: string;

  constructor(verificationToken: string) {
    this.verificationToken = verificationToken;
  }
}
