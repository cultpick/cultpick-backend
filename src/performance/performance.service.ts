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

@Injectable()
export class PerformanceService {
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
