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
import { UserService } from '../user/user.service';
import { GetSearchedPerformanceListQuery } from './dto/request/get-performance-list.query ';

const OPEN_API_URL = process.env.OPEN_API_URL;
const SERVICE_KEY = process.env.SERVICE_KEY;

@Injectable()
export class PerformanceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getSearchedPerformanceList(
    query: GetSearchedPerformanceListQuery,
  ): Promise<{
    totalCount: number;
    performanceList: PerformanceWithPrice[];
  }> {
    const { page, size, q, genreCode, state, areaCode, subAreaCode } = query;

    const { startDate, endDate } = getStartAndEndMonthDate();

    const performanceListWithoutPaginationResponse = await axios.get(
      `${OPEN_API_URL}/pblprfr`,
      {
        params: {
          service: SERVICE_KEY,
          stdate: startDate,
          eddate: endDate,
          cpage: 1,
          rows: 100,
          shprfnm: q,
          shcate: genreCode,
          prfstate: PerformanceStateCode[state],
          signgucode: areaCode,
          signgucodesub: subAreaCode,
        },
      },
    );

    const parsedPerformanceListWithoutPagination = (await xmlToJson(
      performanceListWithoutPaginationResponse.data,
    )) as Performance[];

    const totalCount = parsedPerformanceListWithoutPagination.length;

    const performanceListResponse = await axios.get(`${OPEN_API_URL}/pblprfr`, {
      params: {
        service: SERVICE_KEY,
        stdate: startDate,
        eddate: endDate,
        cpage: page,
        rows: size,
        shprfnm: q,
        shcate: genreCode,
        prfstate: PerformanceStateCode[state],
        signgucode: areaCode,
        signgucodesub: subAreaCode,
      },
    });

    const parsedPerformanceList = (await xmlToJson(
      performanceListResponse.data,
    )) as Performance[];

    const performanceWithPriceList = await this.getPerformanceListWithDetail(
      parsedPerformanceList,
    );

    return {
      totalCount,
      performanceList: performanceWithPriceList,
    };
  }

  async getRecommendedPerformanceList(
    query: GetRecommendedPerformanceListQuery,
  ): Promise<PerformanceWithPrice[]> {
    const { page, size } = query;

    const { startDate, endDate } = getStartAndEndMonthDate();

    const performanceListResponse = await axios.get(`${OPEN_API_URL}/pblprfr`, {
      params: {
        service: SERVICE_KEY,
        stdate: startDate,
        eddate: endDate,
        cpage: page,
        rows: size,
      },
    });

    const parsedPerformanceList = (await xmlToJson(
      performanceListResponse.data,
    )) as Performance[];

    const performanceWithPriceList = await this.getPerformanceListWithDetail(
      parsedPerformanceList,
    );

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
        `${OPEN_API_URL}/pblprfr`,
        {
          params: {
            service: SERVICE_KEY,
            stdate: startDate,
            eddate: endDate,
            cpage: page,
            rows: categorySize,
            shcate: favoriteCategory.categoryCode,
            signgucodesub: existingUser.addressCode,
          },
        },
      );

      const parsedPerformanceList = (await xmlToJson(
        performanceListResponse.data,
      )) as Performance[];

      mergedPerformanceList.push(...parsedPerformanceList);
    }

    const performanceWithPriceList = await this.getPerformanceListWithDetail(
      mergedPerformanceList,
    );

    return performanceWithPriceList;
  }

  async getOngoingPerformanceList(
    query: GetOngoingPerformanceListQuery,
  ): Promise<PerformanceWithPrice[]> {
    const { page, size } = query;

    const { startDate, endDate } = getStartAndEndMonthDate();

    const performanceListResponse = await axios.get(`${OPEN_API_URL}/pblprfr`, {
      params: {
        service: SERVICE_KEY,
        stdate: startDate,
        eddate: endDate,
        cpage: page,
        rows: size,
        prfstate: PerformanceStateCode.ONGOING,
      },
    });

    const parsedPerformanceList = (await xmlToJson(
      performanceListResponse.data,
    )) as Performance[];

    const performanceWithPriceList = await this.getPerformanceListWithDetail(
      parsedPerformanceList,
    );

    return performanceWithPriceList;
  }

  async getPerformanceListWithDetail(
    performanceList: Performance[],
  ): Promise<PerformanceWithPrice[]> {
    const performanceWithPriceList: PerformanceWithPrice[] = [];

    for (const performance of performanceList) {
      const performanceDetailResponse = await axios.get(
        `${OPEN_API_URL}/pblprfr/${performance.mt20id}`,
        {
          params: {
            service: SERVICE_KEY,
          },
        },
      );

      const parsedPerformanceDetail = (await xmlToJson(
        performanceDetailResponse.data,
      )) as PerformanceWithPrice[];

      performanceWithPriceList.push(parsedPerformanceDetail[0]);
    }

    return performanceWithPriceList;
  }
}
