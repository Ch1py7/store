import type { User as UserDomain } from '@store/core'
import type { UserAuth } from '../user_auth/auth'

export interface IUserAuthRepository {
	save(userAuth: UserAuth): Promise<void>
	findByEmail(email: string): Promise<UserDomain>
}
