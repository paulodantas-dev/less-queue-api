import mongoose from 'mongoose'

import { UserRoleEnum } from '@/shared/enums/user-role.enum'

export function createUsersSchema() {
  return new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      phone: { type: String },
      role: { type: String, enum: Object.values(UserRoleEnum), required: true },
      address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        complement: { type: String },
      },
    },
    { timestamps: true },
  )
}

export const UsersModel = mongoose.model('Users', createUsersSchema())
