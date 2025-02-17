import bcrypt from 'bcryptjs'

import { User } from '@/domain/entities/user'
import type { UserRepository } from '@/domain/repositories/user-repository'
import { LoginTypeEnum, UserRoleEnum } from '@/shared/enums'
import { ConflictError } from '@/shared/pre-handlers/error-handler/types/conflict-error'

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    name: string,
    email: string,
    password: string,
    role: UserRoleEnum = UserRoleEnum.CUSTOMER,
    loginType: LoginTypeEnum = LoginTypeEnum.EMAIL,
  ) {
    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) {
      throw new ConflictError('Email already registered.')
    }

    const hashedPassword = await bcrypt.hash(password, 8)
    const newUser = User.create(name, email, hashedPassword, role, loginType)

    return this.userRepository.create(newUser)
  }
}
