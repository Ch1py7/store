import type { User } from '@store/core'

export class GetUserResponse {
	public firstName: string
	public lastName: string
	public createdAt: number
	public email: string
	public role: number

	constructor(user: User) {
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.createdAt = user.createdAt
		this.email = user.email
		this.role = user.role
	}
}
