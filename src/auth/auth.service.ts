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
import { MailService } from 'src/lib/mail/mail.service';
import { SendVerificationCodeMailRequest } from './dto/request/send-verification-code-mail.request';
import { generateRandomCode } from 'src/common/util/random';
import dayjs from 'dayjs';
import { ValidateVerificationCodeRequest } from './dto/request/validate-verification-code.request';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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

  async signIn(body: SignInRequest): Promise<string> {
    const { email, password } = body;

    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `해당 사용자를 찾을 수 없습니다. (email: ${email})`,
      );
    }

    const payload = { id: user.id, name: user.name };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async signUp(body: SignUpRequest): Promise<void> {
    const {
      email,
      password,
      name,
      birthDate,
      gender,
      addressCode,
      favoriteCategoryCodes,
    } = body;

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

    await this.prismaService.$transaction(async (prisma) => {
      const user = await prisma.user.create({
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
        await prisma.userToCategory.createMany({
          data: favoriteCategoryCodes.map((categoryCode) => ({
            userId: user.id,
            categoryCode,
          })),
        });
      }

      return user;
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

    // 1분 후에 다시 시도
    if (
      existingVerificationCode &&
      existingVerificationCode.updatedAt >
        dayjs().subtract(1, 'minutes').toDate()
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
  ): Promise<void> {
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
  }
}
