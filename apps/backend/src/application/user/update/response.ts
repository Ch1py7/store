import type { User } from '@/domain/entities/user/user'

export class UpdateResponse {
  public id: string
  public firstName: string
  public lastName: string

  constructor(user: User) {
    this.id = user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
  }
}
