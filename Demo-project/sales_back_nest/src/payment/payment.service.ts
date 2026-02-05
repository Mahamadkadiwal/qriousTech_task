import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './model/payment.model';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private paymentModel: Model<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const last4 = createPaymentDto.cardNumber.slice(-4);

    const payment = await this.paymentModel.create({
      userId: createPaymentDto.userId,
      orderIds: createPaymentDto.orderIds,
      cardHolder: createPaymentDto.cardHolder,
      last4,
      amount: createPaymentDto.amount,
      status: 'Success',
    });

    return {
      success: true,
      message: 'Payment accepted successfully',
      payment: {
        userId: payment.userId,
        orderIds: payment.orderIds,
        cardHolder: payment.cardHolder,
        amount: payment.amount,
        cardNumber: payment.last4,
      },
    };
  }

  async findAll() {
    return await this.paymentModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid Payment Id');
    }

    const payment = await this.paymentModel
      .findById(id)
      .populate('userId', 'username email')
      .populate('orderIds', 'items totalAmount status')
      .exec();

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid Payment Id');
    }

    const updatePayment = await this.paymentModel.findByIdAndUpdate(
      id,
      updatePaymentDto,
      { new: true },
    );

    if (!updatePayment) {
      throw new NotFoundException('Payment not found');
    }

    return {
      success: true,
      message: 'Payment updated',
      updatePayment,
    };
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid Payment Id');
    }

    const deleted = await this.paymentModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Payment not found');
    }
    return { message: 'Payment deleted successfully' };
  }
}
