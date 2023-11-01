import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get('invoices')
  async invoices() {
    return this.invoicesService.invoices();
  }

  @Get('invoice/:id')
  async invoice(@Param('id') id: string) {
    return this.invoicesService.invoice(id);
  }

  @Post('invoice')
  async create(@Body() invoice: CreateInvoiceDto) {
    return this.invoicesService.create(invoice);
  }

  @Delete('invoice/:id')
  async delete(@Param('id') id: string) {
    return this.invoicesService.delete(id);
  }

  @Patch('invoice/:id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoice: UpdateInvoiceDto,
  ) {
    return this.invoicesService.update(id, updateInvoice);
  }
}
