import { Injectable } from '@nestjs/common';
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
}
