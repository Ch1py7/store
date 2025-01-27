import type { User } from '@store/core'

export class CreateResponse {
	public id: string
	public createdAt: number

	constructor(user: User) {
		this.id = user.id
		this.createdAt = user.createdAt
	}
}
