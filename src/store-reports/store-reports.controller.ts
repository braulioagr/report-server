import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { StoreReportsService } from './store-reports.service';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  public async getOrder(
    @Res() response: Response,
    @Param('orderId') orderId: string,
  ) {
    const pdfDoc = await this.storeReportsService.getOrderByIdReport(+orderId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Order Report.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
