import mongoose from 'mongoose'

import { DeliveryTypeEnum } from '@/shared/enums/delivery-type.enum'
import { WeekDaysEnum } from '@/shared/enums/week-days.enum'

export function createPlacesSchema() {
  return new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
      },
      phone: { type: String, required: true },
      logoUrl: { type: String },
      workingHours: [
        {
          day: { type: String, enum: Object.values(WeekDaysEnum) },
          openingTime: { type: String },
          closingTime: { type: String },
        },
      ],
      deliveryMethods: [
        { type: String, enum: Object.values(DeliveryTypeEnum) },
      ],
    },
    { timestamps: true },
  )
}

export const PlacesModel = mongoose.model('Places', createPlacesSchema())
