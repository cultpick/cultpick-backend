import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetRecommendedPerformanceListQuery } from './dto/request/get-recommended-performance-list.query';
import { xmlToJson } from 'src/common/util/xml-to-json';
import {
  Performance,
  PerformanceWithPrice,
} from 'src/common/open-api/schema/performance';
import { getStartAndEndMonthDate } from 'src/common/util/dayjs';
import { GetOngoingPerformanceListQuery } from './dto/request/get-ongoing-performance-list.query';
import { PerformanceStateCode } from './enum';
import { UserInfo } from 'src/auth/type';
import { GetPersonalizedPerformanceListQuery } from './dto/request/get-personalized-performance-list.query';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PerformanceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getRecommendedPerformanceList(
    query: GetRecommendedPerformanceListQuery,
  ): Promise<PerformanceWithPrice[]> {
    const { page, size } = query;
    const { startDate, endDate } = getStartAndEndMonthDate();

    const performanceListResponse = await axios.get(
      `${process.env.OPEN_API_URL}/pblprfr?service=${process.env.SERVICE_KEY}&stdate=${startDate}&eddate=${endDate}&cpage=${page}&rows=${size}`,
      { responseType: 'text' },
    );

    const parsedPerformanceList = (await xmlToJson(
      performanceListResponse.data,
    )) as Performance[];

    const performanceWithPriceList: PerformanceWithPrice[] = [];

    for (const parsedPerformance of parsedPerformanceList) {
      const performanceDetailResponse = await axios.get(
        `${process.env.OPEN_API_URL}/pblprfr/${parsedPerformance.mt20id}?service=${process.env.SERVICE_KEY}`,
        { responseType: 'text' },
      );

      const parsedPerformanceDetail = (await xmlToJson(
        performanceDetailResponse.data,
      )) as PerformanceWithPrice[];

      performanceWithPriceList.push(parsedPerformanceDetail[0]);
    }

    return performanceWithPriceList;
  }

  async getPersonalizedPerformanceList(
    user: UserInfo,
    query: GetPersonalizedPerformanceListQuery,
  ): Promise<PerformanceWithPrice[]> {
    const { page, size } = query;
    const { startDate, endDate } = getStartAndEndMonthDate();

    const existingUser = await this.userService.getUserByUserId(user.id);

    const favoriteCategoryList =
      await this.prismaService.userToCategory.findMany({
        where: {
          userId: user.id,
        },
      });

    const categorySize = Math.ceil(size / favoriteCategoryList.length);

    const mergedPerformanceList = [];

    for (const favoriteCategory of favoriteCategoryList) {
      const performanceListResponse = await axios.get(
        `${process.env.OPEN_API_URL}/pblprfr?service=${process.env.SERVICE_KEY}&stdate=${startDate}&eddate=${endDate}&cpage=${page}&rows=${categorySize}&shcate=${favoriteCategory.categoryCode}&signgucodesub=${existingUser.addressCode}`,
        { responseType: 'text' },
      );

      const parsedPerformanceList = (await xmlToJson(
        performanceListResponse.data,
      )) as Performance[];

      mergedPerformanceList.push(...parsedPerformanceList);
    }

    const performanceWithPriceList: PerformanceWithPrice[] = [];

    for (const mergedPerformance of mergedPerformanceList) {
      const performanceDetailResponse = await axios.get(
        `${process.env.OPEN_API_URL}/pblprfr/${mergedPerformance.mt20id}?service=${process.env.SERVICE_KEY}`,
        { responseType: 'text' },
      );

      const parsedPerformanceDetail = (await xmlToJson(
        performanceDetailResponse.data,
      )) as PerformanceWithPrice[];

      performanceWithPriceList.push(parsedPerformanceDetail[0]);
    }

    return performanceWithPriceList;
  }

  async getOngoingPerformanceList(
    query: GetOngoingPerformanceListQuery,
  ): Promise<PerformanceWithPrice[]> {
    const { page, size } = query;
    const { startDate, endDate } = getStartAndEndMonthDate();

    const performanceListResponse = await axios.get(
      `${process.env.OPEN_API_URL}/pblprfr?service=${process.env.SERVICE_KEY}&stdate=${startDate}&eddate=${endDate}&cpage=${page}&rows=${size}&prfstate=${PerformanceStateCode.ONGOING}`,
      { responseType: 'text' },
    );

    const parsedPerformanceList = (await xmlToJson(
      performanceListResponse.data,
    )) as Performance[];

    const performanceWithPriceList: PerformanceWithPrice[] = [];

    for (const parsedPerformance of parsedPerformanceList) {
      const performanceDetailResponse = await axios.get(
        `${process.env.OPEN_API_URL}/pblprfr/${parsedPerformance.mt20id}?service=${process.env.SERVICE_KEY}`,
        { responseType: 'text' },
      );

      const parsedPerformanceDetail = (await xmlToJson(
        performanceDetailResponse.data,
      )) as PerformanceWithPrice[];

      performanceWithPriceList.push(parsedPerformanceDetail[0]);
    }

    return performanceWithPriceList;
  }
}
