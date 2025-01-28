import type { User } from '@store/core'

export class LoginResponse {
	public id: string
	public firstName: string
	public lastName: string
	public role: number

	constructor(user: User) {
		this.id = user.id
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.role = user.role
	}
}
