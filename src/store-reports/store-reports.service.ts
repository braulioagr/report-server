import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  public async getOrderByIdReport(
    orderId: number,
  ): Promise<PDFKit.PDFDocument> {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const documentDefinition = orderByIdReport({
      data: order as any,
    });
    const doc = this.printerService.createPdf(documentDefinition);

    return doc;
  }
}
