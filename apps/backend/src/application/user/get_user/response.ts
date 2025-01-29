import type { User } from '@store/core'

export class GetUserResponse {
	public firstName: string
	public lastName: string
	public createdAt: number
	public role: number

	constructor(user: User) {
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.createdAt = user.createdAt
		this.role = user.role
	}
}
