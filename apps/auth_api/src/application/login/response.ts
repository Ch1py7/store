import type { Auth } from '@/domain/auth/auth'

export class LoginResponse {
	public userId: string
	public email: string
	public password: string
	public salt: string

	constructor(user: Auth) {
		this.userId = user.userId
		this.email = user.email
		this.password = user.password
		this.salt = user.salt
	}
}
