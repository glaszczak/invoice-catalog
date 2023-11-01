import { Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ClientProxy } from '@nestjs/microservices';
import { InvoicesRepository } from './invoices.repository';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  private emittedEventsCount = 0;

  constructor(
    @Inject('RABBITMQ_CLIENT') private rabbitmqClient: ClientProxy,
    private readonly invoicesRepository: InvoicesRepository,
  ) {}

  async invoice(_id: string) {
    return this.invoicesRepository.findOne({ _id });
  }

  async invoices() {
    const invoices = await this.invoicesRepository.find({});

    return {
      invoices: invoices,
      total: invoices.length,
    };
  }

  async create(createInvoice: CreateInvoiceDto) {
    const invoice = await this.invoicesRepository.create({
      ...createInvoice,
      issueDate: this.getCurrentDate(),
      totalPrice: this.countTotalPrice(
        createInvoice.netPrice,
        createInvoice.tax,
      ),
    });

    this.emitEvent('invoice_created', invoice._id.toString());

    return {
      status: 'INVOICE_CREATED',
      created_invoice: invoice,
    };
  }

  async update(_id: string, updateInvoice: UpdateInvoiceDto) {
    await this.invoicesRepository.findOneAndUpdate(
      { _id },
      { $set: updateInvoice },
    );

    this.emitEvent('invoice_updated', _id);

    return {
      status: 'INVOICE_UPDATED',
      updated_invoice_id: _id,
      updated_data: updateInvoice,
    };
  }

  async delete(_id: string) {
    await this.invoicesRepository.findOneAndDelete({ _id });

    this.emitEvent('invoice_deleted', _id);

    return {
      status: 'INVOICE_DELETED',
      deleted_invoice: _id,
    };
  }

  private countTotalPrice(netPrice: number, tax: number) {
    return netPrice * (1 + tax / 100);
  }

  private getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private emitEvent(eventName: string, invoiceId: string) {
    this.rabbitmqClient.emit(eventName, {
      invoice_id: invoiceId,
      event_timestamp: new Date(),
    });
    this.emittedEventsCount += 1;
  }

  getEmittedEventsCount(): number {
    return this.emittedEventsCount;
  }
}
