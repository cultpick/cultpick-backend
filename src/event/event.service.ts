import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as xml2js from 'xml2js';
import { GetEventListQuery } from './dto/request/get-event-list.query';

@Injectable()
export class EventService {
  async getEventList(query: GetEventListQuery) {
    const { startDate, endDate } = query;
    try {
      const response = await axios.get(
        `${process.env.OPEN_API_URL}?service=${process.env.SERVICE_KEY}&stdate=${startDate}&eddate=${endDate}&cpage=1&rows=10&shcate=EEEB`,
        { responseType: 'text' },
      );

      // XML to JSON
      const parser = new xml2js.Parser({ explicitArray: false });
      const jsonResult = await parser.parseStringPromise(response.data);

      const eventList = jsonResult.dbs.db;

      return eventList;
    } catch (error) {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  }
}
