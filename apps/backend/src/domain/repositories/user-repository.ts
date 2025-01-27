import type { User as UserDomain } from '@store/core'

export interface IUserRepository {
	findAll(): Promise<UserDomain[] | null>
	findById(id: string): Promise<UserDomain>
	updateUser(user: UserDomain): void
	deleteUser(user: UserDomain): void
}
