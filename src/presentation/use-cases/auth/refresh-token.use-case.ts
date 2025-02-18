import { jwtDecode } from 'jwt-decode'

import type { UserRepository } from '@/domain/repositories/user-repository'
import { NotFoundError } from '@/shared/pre-handlers/error-handler/types/not-found-error'
import { UnauthorizedError } from '@/shared/pre-handlers/error-handler/types/unauthorized-error'

export class RefreshTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(refreshToken: string) {
    try {
      const decoded = jwtDecode(refreshToken)

      const userEmail = decoded.sub
      if (!userEmail) {
        throw new UnauthorizedError('Invalid refresh token.')
      }

      const user = await this.userRepository.findByEmail(userEmail)
      if (!user) {
        throw new NotFoundError('User not found.')
      }

      return user
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token.')
    }
  }
}
