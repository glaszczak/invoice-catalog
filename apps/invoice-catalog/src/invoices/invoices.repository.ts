import { Injectable, Logger } from '@nestjs/common';
import { InvoiceDocument } from './../models/invoice.schema';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InvoicesRepository extends AbstractRepository<InvoiceDocument> {
  protected readonly logger = new Logger(InvoicesRepository.name);

  constructor(
    @InjectModel(InvoiceDocument.name)
    invoiceModel: Model<InvoiceDocument>,
  ) {
    super(invoiceModel);
  }
}
