import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { isValidObjectId } from 'mongoose';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid product ID');
    }
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid product ID');
    }
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid product ID');
    }
    return this.productService.remove(id);
  }
}
