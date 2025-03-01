import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UserInfo } from 'src/auth/type';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(user: UserInfo) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
    });

    const favoriteCategoryList =
      await this.prismaService.userToCategory.findMany({
        where: {
          userId: user.id,
        },
      });

    return {
      ...existingUser,
      favoriteCategoryList,
    };
  }

  async getUserByUserId(userId: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `해당 사용자를 찾을 수 없습니다. (userId: ${userId})`,
      );
    }

    return user;
  }
}
