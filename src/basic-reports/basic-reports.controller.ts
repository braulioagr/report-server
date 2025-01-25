import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}
  @Get()
  public getHello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello World.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  public getEmploymentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:id')
  public async getEmploymentLetterById(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(+id);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter By Id.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  //
  @Get('countries')
  public async getCountries(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries-Report.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
