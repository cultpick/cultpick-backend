import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpRequest } from './dto/request/sign-up.request';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { SignInRequest } from './dto/request/sign-in.request';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpRequest): Promise<User> {
    const { email, password, name, birth, gender, address } = body;

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

    const createdUser = await this.prismaService.user.create({
      data: {
        email,
        password,
        name,
        birth,
        gender,
        address,
      },
    });

    return createdUser;
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

    const payload = { userId: user.id, name: user.name };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }
}
