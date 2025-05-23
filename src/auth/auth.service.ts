import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpRequest } from './dto/request/sign-up.request';
import { PrismaService } from 'prisma/prisma.service';
import { SignInRequest } from './dto/request/sign-in.request';
import { JwtService } from '@nestjs/jwt';
import { CheckEmailRequest } from './dto/request/check-email.request';
import { SendVerificationCodeMailRequest } from './dto/request/send-verification-code-mail.request';
import { generateRandomCode } from 'src/common/util/random';
import dayjs from 'dayjs';
import { ValidateVerificationCodeRequest } from './dto/request/validate-verification-code.request';
import { ConfigService } from '@nestjs/config';
import { UpdatePasswordRequest } from './dto/request/update-password.request';
import { VerifiedUserInfo } from './type';
import { UserService } from 'src/module/user/user.service';
import { MailService } from 'src/module/other/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  async checkEmail(body: CheckEmailRequest): Promise<void> {
    const { email } = body;

    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException(
        `이미 사용 중인 이메일입니다. (email: ${email})`,
      );
    }
  }

  async updatePassword(
    verifiedUserInfo: VerifiedUserInfo,
    body: UpdatePasswordRequest,
  ): Promise<void> {
    const { email } = verifiedUserInfo;
    const { password } = body;

    const user = await this.userService.getUserByUserEmail(email);

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password,
      },
    });
  }

  async signIn(body: SignInRequest): Promise<string> {
    const { email, password } = body;

    const user = await this.userService.getUserByUserEmail(email);

    if (user.password !== password) {
      throw new BadRequestException(
        `비밀번호가 일치하지 않습니다. (email: ${email})`,
      );
    }

    const payload = { id: user.id, name: user.name };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });

    return accessToken;
  }

  async signUp(
    verifiedUserInfo: VerifiedUserInfo,
    body: SignUpRequest,
  ): Promise<void> {
    const { email } = verifiedUserInfo;
    const {
      password,
      name,
      birthDate,
      gender,
      addressCode,
      favoriteCategoryCodes,
    } = body;

    await this.checkEmail({ email });

    await this.prismaService.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          email,
          password,
          name,
          birthDate,
          gender,
          addressCode,
        },
      });

      if (favoriteCategoryCodes?.length) {
        await tx.userToCategory.createMany({
          data: favoriteCategoryCodes.map((categoryCode) => ({
            userId: createdUser.id,
            categoryCode,
          })),
        });
      }

      return createdUser;
    });
  }

  async sendVerificationCodeMail(
    body: SendVerificationCodeMailRequest,
  ): Promise<void> {
    const { email } = body;

    const code = generateRandomCode();

    const existingVerificationCode =
      await this.prismaService.verificationCode.findFirst({
        where: {
          email,
        },
      });

    // 최근 발송 시간으로부터 1분 이내에 다시 시도하는 경우
    if (
      existingVerificationCode &&
      dayjs().isBefore(
        dayjs(existingVerificationCode.updatedAt).add(1, 'minutes'),
      )
    ) {
      throw new BadRequestException(
        `1분 후에 다시 시도해주세요. (email: ${email})`,
      );
    }

    if (existingVerificationCode) {
      await this.prismaService.verificationCode.update({
        where: {
          email,
        },
        data: {
          code,
        },
      });
    } else {
      await this.prismaService.verificationCode.create({
        data: {
          email,
          code,
        },
      });
    }

    await this.mailService.sendVerificationCodeMail(email, code);
  }

  async validateVerificationCode(
    @Body() body: ValidateVerificationCodeRequest,
  ): Promise<string> {
    const { email, code } = body;

    const verificationCode =
      await this.prismaService.verificationCode.findFirst({
        where: {
          email,
        },
      });

    // 인증번호가 없거나, 발송된지 5분이 지남
    if (
      !verificationCode ||
      dayjs().isAfter(dayjs(verificationCode.updatedAt).add(5, 'minutes'))
    ) {
      throw new NotFoundException(
        `해당 이메일로 발송된 인증번호가 없습니다. (email: ${email})`,
      );
    }

    if (verificationCode.code !== code) {
      throw new BadRequestException(
        `인증번호가 일치하지 않습니다. (email: ${email})`,
      );
    }

    await this.prismaService.verificationCode.delete({
      where: {
        email,
      },
    });

    const payload = { email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('VERIFICATION_TOKEN_SECRET'),
    });

    return accessToken;
  }
}
