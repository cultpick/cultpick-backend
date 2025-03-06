import { Module } from '@nestjs/common';
import { PickController } from './pick.controller';
import { PickService } from './pick.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PickController],
  providers: [PickService, PrismaService],
})
export class PickModule {}
