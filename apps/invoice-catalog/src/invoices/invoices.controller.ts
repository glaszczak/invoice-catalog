import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get('invoices')
  async invoices() {
    return this.invoicesService.invoices();
  }

  @Post('invoice')
  async create(@Body() invoice: CreateInvoiceDto) {
    return this.invoicesService.create(invoice);
  }

  @Delete('invoice/:id')
  async delete(@Param('id') id: number) {
    return this.invoicesService.delete(Number(id));
  }
}
