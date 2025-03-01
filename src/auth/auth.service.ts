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
    const {
      email,
      password,
      name,
      birth,
      gender,
      addressCode,
      favoriteCategoryIds,
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

    const createdUser = await this.prismaService.$transaction(
      async (prisma) => {
        const user = await prisma.user.create({
          data: {
            email,
            password,
            name,
            birth,
            gender,
            addressCode,
          },
        });

        if (favoriteCategoryIds?.length) {
          await prisma.userToCategory.createMany({
            data: favoriteCategoryIds.map((categoryId) => ({
              userId: user.id,
              categoryId,
            })),
          });
        }

        return user;
      },
    );

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

    const payload = { id: user.id, name: user.name };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }
}
