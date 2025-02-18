import bcrypt from 'bcryptjs'

import type { UserRepository } from '@/domain/repositories/user-repository'
import { UnauthorizedError } from '@/shared/pre-handlers/error-handler/types/unauthorized-error'

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new UnauthorizedError('Invalid email or password.')
    }

    const passwordMatch = await bcrypt.compare(password, user.getPassword())
    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid email or password.')
    }

    return user
  }
}
