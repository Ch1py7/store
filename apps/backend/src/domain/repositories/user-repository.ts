import type { User } from '@prisma/client'

export interface UserRepository {
	findByEmail(email: string): Promise<User | null>
	findAll(): Promise<User[] | null>
	save(save: Save): Promise<void>
}

interface Save {
	user: User
	salt: string
}
