import type { User as UserDomain } from '@/domain/entities/user/user'
import type { User as UserDb } from '@prisma/client'

export interface IUserRepository {
	findByEmail(email: string): Promise<UserDomain | null>
	findAll(): Promise<UserDomain[] | null>
	findById(id: string): Promise<UserDomain>
	createUser(user: UserDomain, salt: string): Promise<UserDb>
	updateUser(user: UserDomain): Promise<UserDb>
	deleteUser(user: UserDomain): Promise<UserDb>
}
