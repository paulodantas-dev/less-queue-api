import mongoose from 'mongoose'

import { OrderStatusEnum } from '@/shared/enums/order-status.enum'

export function createOrdersSchema() {
  return new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Companies',
        required: true,
      },
      items: [
        {
          itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Items',
            required: true,
          },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      status: {
        type: String,
        enum: Object.values(OrderStatusEnum),
        default: OrderStatusEnum.PENDING,
        required: true,
      },
      totalPrice: { type: Number, required: true },
      estimatedCompletionTime: { type: Date, required: true },
    },
    { timestamps: true },
  )
}

export const OrdersModel = mongoose.model('Orders', createOrdersSchema())
