import {
  ArrayMinSize,
  IsIn,
  IsNumber,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

export class CreateInvoiceDto {
  @Matches(/^(\d{4})-(\d{2})-(\d{2})$/, {
    message: 'Date of the purchase must be in the format YYYY-MM-DD',
  })
  purchaseDate: string;

  @IsString({ message: 'Supplier must be a string' })
  @MinLength(1, { message: 'Supplier must not be an empty string' })
  supplier: string;

  @IsString({ message: 'Customer must be a string' })
  @MinLength(1, { message: 'Customer must not be an empty string' })
  customer: string;

  @IsString({ each: true, message: 'Each product must be a string' })
  @MinLength(1, {
    each: true,
    message: 'Each product must not be an empty string',
  })
  @ArrayMinSize(1, { message: 'At least one product must be provided' })
  products: string[];

  @IsNumber({}, { message: 'Net price must be a number' })
  @Min(1, { message: 'Net price must be higher than 0' })
  netPrice: number;

  @IsNumber({}, { message: 'Tax must be a number' })
  @IsIn([5, 8, 23], {
    message: 'Tax must be one of the following values: 5, 8, 23',
  })
  tax: number;
}
