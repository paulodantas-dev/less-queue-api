import type { UserProfile } from '../entities/user-profile'

export interface UserProfileRepository {
  findById(userId: string): Promise<UserProfile | null>
}
