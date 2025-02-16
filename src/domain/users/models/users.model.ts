import mongoose from 'mongoose'

import { LoginTypeEnum } from '@/shared/enums/login-type.enum'
import { UserRoleEnum } from '@/shared/enums/user-role.enum'

export function createUsersSchema() {
  return new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String },
      phone: { type: String },
      role: { type: String, enum: Object.values(UserRoleEnum), required: true },
      loginType: {
        type: String,
        enum: Object.values(LoginTypeEnum),
        required: true,
      },
      googleId: { type: String },
      companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Companies' },
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
