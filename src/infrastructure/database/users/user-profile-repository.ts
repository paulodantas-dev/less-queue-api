import { UserProfile } from '@/domain/entities/user-profile'
import type { UserProfileRepository } from '@/domain/repositories/user-profile-repository'

import { UsersModel } from './users.model'

export class UserProfileRepositoryDatabase implements UserProfileRepository {
  async findById(userId: string): Promise<UserProfile | null> {
    const userDoc = await UsersModel.findById(userId).lean()

    if (!userDoc) {
      return null
    }

    return new UserProfile(
      userDoc._id.toString(),
      userDoc.name,
      userDoc.email,
      userDoc.phone ?? undefined,
      userDoc.role,
      userDoc.loginType,
      userDoc.googleId ?? undefined,
      userDoc.companyId?.toString(),
      userDoc.address
        ? {
            street: userDoc.address.street ?? undefined,
            city: userDoc.address.city ?? undefined,
            state: userDoc.address.state ?? undefined,
            zipCode: userDoc.address.zipCode ?? undefined,
            complement: userDoc.address.complement ?? undefined,
          }
        : undefined,
      userDoc.createdAt,
      userDoc.updatedAt,
    )
  }
}
