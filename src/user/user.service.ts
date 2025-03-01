import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UserInfo } from 'src/auth/type';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(user: UserInfo): Promise<User> {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
    });

    return existingUser;
  }
}
