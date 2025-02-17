import { User } from '@/domain/entities/user'
import type { UserRepository } from '@/domain/repositories/user-repository'

import { UsersModel } from './users.model'

export class UserRepositoryDatabase implements UserRepository {
  async create(user: User): Promise<User> {
    const newUser = new UsersModel({
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      loginType: user.getLoginType(),
    })
    await newUser.save()

    return new User(
      newUser._id.toString(),
      newUser.name,
      newUser.email,
      newUser.password ?? '',
      newUser.role,
      newUser.loginType,
    )
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await UsersModel.findOne({ email })
    if (!user) return null

    return new User(
      user._id.toString(),
      user.name,
      user.email,
      user.password ?? '',
      user.role,
      user.loginType,
    )
  }
}
