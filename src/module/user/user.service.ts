import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UserInfo } from 'src/auth/type';
import { UpdateUserDetailRequest } from './dto/request/update-user-detail.request';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserDetail(userInfo: UserInfo) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        id: userInfo.id,
      },
    });

    const favoriteCategoryList =
      await this.prismaService.userToCategory.findMany({
        where: {
          userId: userInfo.id,
        },
      });

    return {
      ...existingUser,
      favoriteCategoryList,
    };
  }

  async updateUserDetail(
    userInfo: UserInfo,
    body: UpdateUserDetailRequest,
  ): Promise<void> {
    const { name, gender, birthDate, addressCode } = body;

    await this.getUserByUserId(userInfo.id);

    await this.prismaService.user.update({
      where: {
        id: userInfo.id,
      },
      data: {
        name,
        gender,
        birth: birthDate,
        addressCode,
      },
    });
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
