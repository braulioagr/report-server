/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}
  @Get()
  public async getHello() {
    return this.basicReportsService.getHello();
  }
}
