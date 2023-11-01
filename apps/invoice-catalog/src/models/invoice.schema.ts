import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

enum Tax {
  VAT_5 = 5,
  VAT_8 = 8,
  VAT_23 = 23,
}

@Schema({ versionKey: false })
export class InvoiceDocument extends AbstractDocument {
  @Prop()
  issueDate: string;

  @Prop()
  purchaseDate: string;

  @Prop()
  supplier: string;

  @Prop()
  customer: string;

  @Prop()
  products: string[];

  @Prop()
  netPrice: number;

  @Prop()
  tax: Tax;

  @Prop()
  totalPrice: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceDocument);
