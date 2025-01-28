import type { User } from '@store/core'
import type { Auth } from '../auth/auth'
import type { UserAuth } from '../user_auth/user-auth'

export interface IUserAuthRepository {
	save(userAuth: UserAuth): Promise<void>
	getSession(userId: string): Promise<User>
	findByEmail(email: string): Promise<Auth | null>
}
