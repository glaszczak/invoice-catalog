import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as MOCKED_INVOICES from './invoices.json';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  private currentInvoices = [];

  constructor() {
    this.currentInvoices = [...MOCKED_INVOICES];
  }

  invoices() {
    return {
      invoices: this.currentInvoices,
      total: this.currentInvoices.length,
    };
  }

  create({
    purchaseDate,
    supplier,
    customer,
    products,
    netPrice,
    tax,
  }: CreateInvoiceDto) {
    const newInvoice = {
      id: this.getPreviousId() + 1,
      issue_date: this.getCurrentDate(),
      purchase_date: purchaseDate,
      supplier: supplier,
      customer: customer,
      products: products,
      net_price: netPrice,
      tax: tax,
      total_price: this.countTotalPrice(netPrice, tax),
    };

    this.currentInvoices.push(newInvoice);

    return {
      status: 'INVOICE_CREATED',
      created_invoice: newInvoice,
      total: this.currentInvoices.length,
    };
  }

  delete(id: number) {
    const foundInvoice = this.currentInvoices.find(
      (invoice) => invoice.id === id,
    );

    if (!foundInvoice) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }

    const filteredInvoices = this.currentInvoices.filter(
      (invoice) => invoice.id !== id,
    );
    this.currentInvoices.length = 0;
    Array.prototype.push.apply(this.currentInvoices, filteredInvoices);

    return {
      status: 'INVOICE_DELETED',
      deleted_invoice: foundInvoice,
      total: this.currentInvoices.length,
    };
  }

  private getPreviousId() {
    return this.currentInvoices[this.currentInvoices.length - 1].id;
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
}
