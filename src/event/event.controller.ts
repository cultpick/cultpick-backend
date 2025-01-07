import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';

@ApiTags('Event (행사)')
@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({
    summary: '행사 목록 조회',
    description: 'TODO: OpenAPI 연결',
  })
  @Get()
  getEventList() {}

  @ApiOperation({
    summary: '행사 상세 조회',
    description: 'TODO: OpenAPI 연결',
  })
  @Get('/:eventId')
  getEventDetail() {}
}
