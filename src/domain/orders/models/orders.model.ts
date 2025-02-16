import mongoose from 'mongoose'

import { DeliveryTypeEnum } from '@/shared/enums/delivery-type.enum'
import { OrderStatusEnum } from '@/shared/enums/order-status.enum'
import { PaymentMethodEnum } from '@/shared/enums/payment-method.enum'

export function createOrdersSchema() {
  return new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places',
        required: true,
      },
      items: [
        {
          itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Items',
            required: true,
          },
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      status: {
        type: String,
        enum: Object.values(OrderStatusEnum),
        default: OrderStatusEnum.PENDING,
      },
      estimatedCompletionTime: { type: Date },
      totalPrice: { type: Number, required: true },
      deliveryType: {
        type: String,
        enum: Object.values(DeliveryTypeEnum),
        required: true,
      },
      deliveryAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        complement: { type: String },
      },
      paymentMethod: {
        type: String,
        enum: Object.values(PaymentMethodEnum),
        required: true,
      },
      trackingUrl: { type: String },
    },
    { timestamps: true },
  )
}

export const OrdersModel = mongoose.model('Orders', createOrdersSchema())
