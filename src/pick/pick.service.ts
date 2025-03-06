import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePickRequest } from './dto/request/create-pick.request';
import { Pick } from '@prisma/client';
import { UserInfo } from 'src/auth/type';
import { DeletePickListRequest } from './dto/request/delete-pick.request';

@Injectable()
export class PickService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPick(user: UserInfo, body: CreatePickRequest): Promise<Pick> {
    const { performanceId } = body;

    const existingPick = await this.prismaService.pick.findFirst({
      where: {
        userId: user.id,
        performanceId,
      },
    });

    if (existingPick) {
      throw new BadRequestException(
        `이미 픽한 공연입니다. (performanceId: ${performanceId})`,
      );
    }

    const createdPick = await this.prismaService.pick.create({
      data: {
        userId: user.id,
        performanceId,
      },
    });

    return createdPick;
  }

  async getPickList(user: UserInfo): Promise<Pick[]> {
    const pickList = await this.prismaService.pick.findMany({
      where: {
        userId: user.id,
      },
    });

    return pickList;
  }

  async deletePickList(
    user: UserInfo,
    body: DeletePickListRequest,
  ): Promise<string[]> {
    const { performanceIdList } = body;

    await this.prismaService.$transaction(async (tx) => {
      for (const performanceId of performanceIdList) {
        const existingPick = await tx.pick.findFirst({
          where: {
            userId: user.id,
            performanceId,
          },
        });

        if (!existingPick) {
          throw new NotFoundException(
            `해당 공연를 찾을 수 없습니다. (performanceId: ${performanceId})`,
          );
        }

        await tx.pick.delete({
          where: {
            userId_performanceId: {
              userId: user.id,
              performanceId,
            },
          },
        });
      }
    });

    return performanceIdList;
  }
}
