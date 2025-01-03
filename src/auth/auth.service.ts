import { Injectable, NotFoundException } from '@nestjs/common';
import { SignUpRequest } from './dtos/requests/sign-up.request';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { SignInRequest } from './dtos/requests/sign-in.request';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpRequest): Promise<User> {
    const createdUser = await this.prismaService.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: body.password,
      },
    });

    return createdUser;
  }

  async signIn(body: SignInRequest): Promise<string> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `해당 사용자를 찾을 수 없습니다. (username: ${body.username})`,
      );
    }

    const payload = { userId: user.id, name: user.name };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }
}
