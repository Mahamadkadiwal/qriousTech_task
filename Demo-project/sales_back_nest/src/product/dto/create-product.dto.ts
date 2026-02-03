import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1200000)
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: string;
}
