import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './model/order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const totalAmount = createOrderDto.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    return await this.orderModel.create({
      ...createOrderDto,
      totalAmount,
      status: 'Pending',
      orderDate: new Date(),
    });
  }

  async findAll() {
    const orders = await this.orderModel
      .find()
      .populate('userId', 'username email')
      .sort({ createAt: -1 })
      .lean();

    return orders.map((o) => ({
      ...o,
      id: o._id,
      _id: undefined,
    }));
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid Order ID');
    }
    const order = await this.orderModel
      .findById(id)
      .populate('userId', 'username email')
      .exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async getOrderByUserId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid User ID');
    }
    const orders = await this.orderModel
      .find({
        userId: id,
      })
      .populate('items.productId', 'image description')
      .sort({ createdAt: -1 })
      .lean();

    return orders.map((o) => ({
      ...o,
      id: o._id,
      _id: undefined,
    }));
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid Order ID');
    }
    let totalAmount: number = 0;
    if (updateOrderDto.items) {
      totalAmount = updateOrderDto.items?.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
    }

    const updatePayload = {
      ...updateOrderDto,
      totalAmount,
    };
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true },
    );

    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }

    return updatedOrder;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid Order ID');
    }
    const deleted = await this.orderModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Order not found');
    }
    return { message: 'Order deleted successfully' };
  }
}
