import type { User } from '@store/core'

export class CreateResponse {
	public id: string
	public firstName: string
	public lastName: string
	public email: string
	public role: number

	constructor(user: User) {
		this.id = user.id
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.email = user.email
		this.role = user.role
	}
}
