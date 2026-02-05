import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './model/product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.create(createProductDto);
    return {
      productId: product._id,
      product_name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    };
  }

  async findAll() {
    const products = await this.productModel.find().select('-__v').lean();

    return products.map((p) => ({
      ...p,
      id: p._id,
      _id: undefined,
    }));
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id).select('-__v');
      if (!product) throw new NotFoundException('Product not found');
      return product;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .select('-__v');
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
