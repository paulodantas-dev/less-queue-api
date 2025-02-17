import { randomUUID } from 'node:crypto'

import type { LoginTypeEnum, UserRoleEnum } from '@/shared/enums'

export class User {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
    private readonly role: UserRoleEnum,
    private readonly loginType: LoginTypeEnum,
  ) {}

  static create(
    name: string,
    email: string,
    password: string,
    role: UserRoleEnum,
    loginType: LoginTypeEnum,
  ): User {
    return new User(randomUUID(), name, email, password, role, loginType)
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getEmail(): string {
    return this.email
  }

  getPassword(): string {
    return this.password
  }

  getRole(): UserRoleEnum {
    return this.role
  }

  getLoginType(): LoginTypeEnum {
    return this.loginType
  }
}
