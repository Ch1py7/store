import type { User } from '@/domain/entities/user/user'

export class CreateResponse {
	public id: string
	public email: string
	public createdAt: number

	constructor(user: User) {
		this.id = user.id
		this.email = user.email
		this.createdAt = user.createdAt
	}
}
