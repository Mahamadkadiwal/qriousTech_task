import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/product/model/product.model';
import { User } from 'src/user/model/user.model';

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

@Schema({ _id: false })
export class OrderItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  productId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 1 })
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({
  timestamps: true,
})
export class Order extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: mongoose.Types.ObjectId;

  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({
    required: true,
    enum: OrderStatus,
    default: OrderStatus.Pending,
  })
  status: OrderStatus;

  @Prop({ type: Date, default: Date.now })
  orderDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' })
  paymentId?: mongoose.Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
