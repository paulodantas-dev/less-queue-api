import bcrypt from 'bcryptjs'

import { UsersModel } from '@/domain/users/models/users.model'
import { LoginTypeEnum } from '@/shared/enums/login-type.enum'
import { UserRoleEnum } from '@/shared/enums/user-role.enum'
import { ConflictError } from '@/shared/pre-handlers/error-handler/types/conflict-error'

type RegisterServiceParams = {
  name: string
  email: string
  password: string
}

export async function registerService({
  name,
  email,
  password,
}: RegisterServiceParams) {
  const existingUser = await UsersModel.findOne({ email })

  if (existingUser) {
    throw new ConflictError('Email already registered.')
  }

  const hashedPassword = await bcrypt.hash(password, 8)

  const user = new UsersModel({
    name,
    email,
    password: hashedPassword,
    role: UserRoleEnum.CUSTOMER,
    loginType: LoginTypeEnum.EMAIL,
  })

  await user.save()

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  }
}
