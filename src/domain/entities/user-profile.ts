export class UserProfile {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly phone?: string,
    private readonly role?: string,
    private readonly loginType?: string,
    private readonly googleId?: string,
    private readonly companyId?: string,
    private readonly address?: {
      street?: string
      city?: string
      state?: string
      zipCode?: string
      complement?: string
    },
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {}

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getEmail(): string {
    return this.email
  }

  getPhone(): string | undefined {
    return this.phone
  }

  getRole(): string | undefined {
    return this.role
  }

  getLoginType(): string | undefined {
    return this.loginType
  }

  getGoogleId(): string | undefined {
    return this.googleId
  }

  getCompanyId(): string | undefined {
    return this.companyId
  }

  getAddress():
    | {
        street?: string
        city?: string
        state?: string
        zipCode?: string
        complement?: string
      }
    | undefined {
    return this.address
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt
  }
}
