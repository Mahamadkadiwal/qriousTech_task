import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsMongoId()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  orderIds: string[];

  @IsString()
  @IsNotEmpty()
  cardHolder: string;

  @IsString()
  @Length(12, 19)
  cardNumber: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  amount: number;
}
