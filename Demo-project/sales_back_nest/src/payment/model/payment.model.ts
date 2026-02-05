import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Order } from 'src/order/model/order.model';
import { User } from 'src/user/model/user.model';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: mongoose.Types.ObjectId;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Order.name,
    required: true,
  })
  orderIds: mongoose.Types.ObjectId[];

  @Prop({ required: true })
  cardHolder: string;

  @Prop({ required: true })
  last4: string;

  @Prop({ required: true })
  amount: number;

  @Prop({
    enum: ['Success', 'Failed', 'Pending'],
    default: 'Success',
  })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
