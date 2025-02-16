import mongoose from 'mongoose'

import { QueueStatusEnum } from '@/shared/enums/queue-status.enum'

export function createQueuesSchema() {
  return new mongoose.Schema(
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        required: true,
      },
      placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places',
        required: true,
      },
      position: { type: Number },
      status: {
        type: String,
        enum: Object.values(QueueStatusEnum),
        default: QueueStatusEnum.WAITING,
      },
      estimatedCompletionTime: { type: Date },
      timeInQueue: { type: Number },
    },
    { timestamps: true },
  )
}

export const QueuesModel = mongoose.model('Queues', createQueuesSchema())
