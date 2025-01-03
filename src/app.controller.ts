import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: '서버 상태 확인',
  })
  @Get()
  healthCheck() {
    return this.appService.healthCheck();
  }
}
