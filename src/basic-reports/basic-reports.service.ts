import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getEmploymentLetterReport,
  getEmploymentLetterReportById,
  getHelloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Database connected');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  public hello(): PDFKit.PDFDocument {
    const documentDefinition = getHelloWorldReport({ name: 'Braulio' });
    const doc = this.printerService.createPdf(documentDefinition);

    return doc;
  }

  public employmentLetter(): PDFKit.PDFDocument {
    const documentDefinition = getEmploymentLetterReport();
    const doc = this.printerService.createPdf(documentDefinition);

    return doc;
  }

  public async employmentLetterById(id: number): Promise<PDFKit.PDFDocument> {
    const employee = await this.employees.findUnique({ where: { id } });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const documentDefinition = getEmploymentLetterReportById({
      employerName: 'Braulio Garcia',
      employerPosition: 'Gerente de Desarrollo',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Corp.',
    });
    const doc = this.printerService.createPdf(documentDefinition);

    return doc;
  }
}
