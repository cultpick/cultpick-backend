import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpRequest } from './dto/request/sign-up.request';
import { SignInRequest } from './dto/request/sign-in.request';
import { SignInResponse } from './dto/response/sign-in.response';
import { CheckEmailRequest } from './dto/request/check-email.request';
import { SuccessResponse } from 'src/common/dto/response/success.response';
import { SendVerificationCodeMailRequest } from './dto/request/send-verification-code-mail.request';
import { ValidateVerificationCodeRequest } from './dto/request/validate-verification-code.request';
import { ValidateVerificationCodeResponse } from './dto/response/validate-verification-code.response';
import { VerificationTokenBearerGuard } from './guard/verification-token-bearer.guard';
import { UpdatePasswordRequest } from './dto/request/update-password.request';
import { CurrentVerifiedUser } from 'src/common/decorator/current-verified-user.decorator';
import { VerifiedUserInfo } from './type';

@ApiTags('Auth (인증)')
@ApiBearerAuth('jwt')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '이메일 중복 체크',
  })
  @Post('/check-email')
  async checkEmail(@Body() body: CheckEmailRequest): Promise<SuccessResponse> {
    await this.authService.checkEmail(body);

    return new SuccessResponse();
  }

  @ApiOperation({
    summary: '비밀번호 변경',
  })
  @UseGuards(VerificationTokenBearerGuard)
  @Put('/password')
  async updatePassword(
    @CurrentVerifiedUser() verifiedUserInfo: VerifiedUserInfo,
    @Body() body: UpdatePasswordRequest,
  ): Promise<SuccessResponse> {
    await this.authService.updatePassword(verifiedUserInfo, body);
    return new SuccessResponse();
  }

  @ApiOperation({
    summary: '로그인',
    description: 'accessToken 유효기간: 1일',
  })
  @Post('/sign-in')
  async signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    const accessToken = await this.authService.signIn(body);

    return new SignInResponse(accessToken);
  }

  @ApiOperation({
    summary: '회원가입',
  })
  @UseGuards(VerificationTokenBearerGuard)
  @Post('/sign-up')
  async signUp(
    @CurrentVerifiedUser() verifiedUserInfo: VerifiedUserInfo,
    @Body() body: SignUpRequest,
  ): Promise<SuccessResponse> {
    await this.authService.signUp(verifiedUserInfo, body);

    return new SuccessResponse();
  }

  @ApiOperation({
    summary: '인증번호 이메일 발송',
  })
  @Post('/verification')
  async sendVerificationCodeMail(
    @Body() body: SendVerificationCodeMailRequest,
  ): Promise<SuccessResponse> {
    await this.authService.sendVerificationCodeMail(body);

    return new SuccessResponse();
  }

  @ApiOperation({
    summary: '인증번호 검증',
  })
  @Post('/verification/validate')
  async validateVerificationCode(
    @Body() body: ValidateVerificationCodeRequest,
  ): Promise<ValidateVerificationCodeResponse> {
    const signUpToken = await this.authService.validateVerificationCode(body);

    return new ValidateVerificationCodeResponse(signUpToken);
  }
}
