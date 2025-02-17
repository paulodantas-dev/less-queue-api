import mongoose from 'mongoose'

import { DeliveryTypeEnum, WeekDaysEnum } from '@/shared/enums'

export function createCompaniesSchema() {
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
      phone: { type: String },
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
      ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
    },
    { timestamps: true },
  )
}

export const CompaniesModel = mongoose.model(
  'Companies',
  createCompaniesSchema(),
)
