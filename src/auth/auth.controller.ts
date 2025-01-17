import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpRequest } from './dto/request/sign-up.request';
import { SignInRequest } from './dto/request/sign-in.request';
import { SignInResponse } from './dto/response/sign-in.response';
import { CreateActionResponse } from 'src/common/dto/response/id.response';

@ApiTags('Auth (인증)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '회원가입',
    description: 'TODO: 이메일 인증 기능',
  })
  @Post('sign-up')
  async signUp(@Body() body: SignUpRequest): Promise<CreateActionResponse> {
    const createdUser = await this.authService.signUp(body);

    return new CreateActionResponse(createdUser.id);
  }

  @ApiOperation({
    summary: '로그인',
    description: 'accessToken 유효기간: 1일',
  })
  @Post('sign-in')
  async signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    const accessToken = await this.authService.signIn(body);

    return new SignInResponse(accessToken);
  }
}
