import type { User } from '@store/core'

export class DeleteResponse {
	public id: string
	public isDeleted?: boolean

	constructor(user: User) {
		this.id = user.id
		this.isDeleted = user.isDeleted
	}
}
