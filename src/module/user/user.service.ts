import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UserInfo } from 'src/auth/type';
import { UpdateUserDetailRequest } from './dto/request/update-user-detail.request';
import { UserWithUTCs } from './type';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserDetail(userInfo: UserInfo): Promise<UserWithUTCs> {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        id: userInfo.id,
      },
      include: {
        userToCategory: true,
      },
    });

    return existingUser;
  }

  async updateUserDetail(
    userInfo: UserInfo,
    body: UpdateUserDetailRequest,
  ): Promise<void> {
    const { name, gender, birthDate, addressCode, favoriteCategoryCodes } =
      body;

    await this.getUserByUserId(userInfo.id);

    await this.prismaService.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: userInfo.id,
        },
        data: {
          name,
          gender,
          birthDate,
          addressCode,
        },
      });

      await tx.userToCategory.deleteMany({
        where: {
          userId: userInfo.id,
        },
      });

      const createCategoryPromises = favoriteCategoryCodes.map(
        (favoriteCategoryCode) =>
          tx.userToCategory.create({
            data: {
              userId: userInfo.id,
              categoryCode: favoriteCategoryCode,
            },
          }),
      );

      await Promise.all(createCategoryPromises);
    });
  }

  async deleteUser(userInfo: UserInfo): Promise<void> {
    await this.getUserByUserId(userInfo.id);

    await this.prismaService.user.delete({
      where: {
        id: userInfo.id,
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

  async getUserByUserEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `해당 사용자를 찾을 수 없습니다. (email: ${email})`,
      );
    }

    return user;
  }
}
