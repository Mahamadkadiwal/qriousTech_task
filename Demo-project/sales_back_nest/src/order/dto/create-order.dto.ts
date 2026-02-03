import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateOrderItemDto {

  @IsMongoId()
  productId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  quantity: number;
}


export class CreateOrderDto {

  @IsMongoId()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
