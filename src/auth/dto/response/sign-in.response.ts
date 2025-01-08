import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty({ description: 'Access Token', example: 'accessToken' })
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
