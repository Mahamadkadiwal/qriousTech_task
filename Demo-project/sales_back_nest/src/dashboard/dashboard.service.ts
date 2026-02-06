import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/order/model/order.model';
import { Payment } from 'src/payment/model/payment.model';
import { Product } from 'src/product/model/product.model';
import { User } from 'src/user/model/user.model';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  async getCount() {
    const customers = await this.userModel.countDocuments({ role: 'user' });

    const totalOrders = await this.orderModel.countDocuments();

    const products = await this.productModel.countDocuments();

    const result = await this.paymentModel.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' },
        },
      },
    ]);

    const totalIncome = result[0]?.totalIncome || 0;

    return {
      customers,
      totalOrders,
      products,
      totalIncome,
    };
  }

  async getDaily() {
    return this.orderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$orderDate' } },
          orders: { $sum: 1 },
          income: { $sum: '$totalAmount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async getMonthly() {
    return this.orderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$orderDate' } },
          orders: { $sum: 1 },
          income: { $sum: '$totalAmount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async getWeekly() {
    return this.orderModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$orderDate' },
            week: { $week: '$orderDate' },
          },
          orders: { $sum: 1 },
          income: { $sum: '$totalAmount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async getCharts() {
    const daily = await this.getDaily();
    const monthly = await this.getMonthly();
    const weekly = await this.getWeekly();

    return { daily, monthly, weekly };
  }

  async getStatusCount() {
    return this.orderModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          value: '$count',
        },
      },
    ]);
  }

  async getProductCount() {
    return this.orderModel.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          name: { $first: '$items.name' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { orders: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          name: 1,
          orders: 1,
        },
      },
    ]);
  }
}
