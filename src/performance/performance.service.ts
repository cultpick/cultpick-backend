import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetPerformanceListQuery } from './dto/request/get-performance-list.query';
import { xmlToJson } from 'src/common/util/xml-to-json';
import { Performance } from 'src/common/open-api/schema/performance';

@Injectable()
export class PerformanceService {
  async getPerformanceList(
    query: GetPerformanceListQuery,
  ): Promise<Performance[]> {
    const { startDate, endDate, page, size } = query;

    try {
      const response = await axios.get(
        `${process.env.OPEN_API_URL}/pblprfr?service=${process.env.SERVICE_KEY}&stdate=${startDate}&eddate=${endDate}&cpage=${page}&rows=${size}`,
        { responseType: 'text' },
      );

      const performanceList = (await xmlToJson(response.data)) as Performance[];

      return performanceList;
    } catch (error) {
      throw new Error(`OpenAPI 오류: ${error.message}`);
    }
  }

  async getFestivalList(
    query: GetPerformanceListQuery,
  ): Promise<Performance[]> {
    const { startDate, endDate } = query;

    try {
      const response = await axios.get(
        `${process.env.OPEN_API_URL}/prffest?service=${process.env.SERVICE_KEY}&stdate=${startDate}&eddate=${endDate}&cpage=1&rows=10&shcate=EEEB`,
        { responseType: 'text' },
      );

      const performanceList = (await xmlToJson(response.data)) as Performance[];

      return performanceList;
    } catch (error) {
      throw new Error(`OpenAPI 오류: ${error.message}`);
    }
  }
}
