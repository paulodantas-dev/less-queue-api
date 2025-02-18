import type { UserProfile } from '@/domain/entities/user-profile'
import type { UserProfileRepository } from '@/domain/repositories/user-profile-repository'
import { NotFoundError } from '@/shared/pre-handlers/error-handler/types/not-found-error'

export class MeUseCase {
  constructor(private readonly userProfileRepository: UserProfileRepository) {}

  async getUserProfileById(userId: string): Promise<UserProfile | null> {
    const userProfile = await this.userProfileRepository.findById(userId)

    if (!userProfile) {
      throw new NotFoundError('User not found')
    }

    return userProfile
  }
}
