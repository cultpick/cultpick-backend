import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { GetEventListQuery } from './dto/request/get-event-list.query';

@ApiTags('Event (행사)')
@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({
    summary: '행사 목록 조회',
    description: 'TODO: 페이지네이션',
  })
  @Get()
  async getEventList(@Query() query: GetEventListQuery) {
    const eventList = await this.eventService.getEventList(query);
    return eventList;
  }

  @ApiOperation({
    summary: '행사 상세 조회',
    description: 'TODO: OpenAPI 연결',
  })
  @Get('/:eventId')
  getEventDetail() {}
}
