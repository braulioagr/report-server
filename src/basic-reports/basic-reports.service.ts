/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect();
    console.log('Database connected');
  }

  async getHello() {
    return this.employees.findFirst();
  }
}
