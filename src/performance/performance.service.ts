import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { GetPerformanceListQuery } from './dto/request/get-recommended-performance-list.query';
import { xmlToJson } from 'src/common/util/xml-to-json';
import {
  Performance,
  PerformanceWithPrice,
} from 'src/common/open-api/schema/performance';
import { getStartAndEndMonthDate } from 'src/common/util/dayjs';

@Injectable()
export class PerformanceService {
  async getRecommendedPerformanceList(
    query: GetPerformanceListQuery,
  ): Promise<PerformanceWithPrice[]> {
    const { page, size } = query;
    const { startDate, endDate } = getStartAndEndMonthDate();

    try {
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
    } catch (error) {
      throw new InternalServerErrorException(`OpenAPI 오류: ${error.message}`);
    }
  }
}
