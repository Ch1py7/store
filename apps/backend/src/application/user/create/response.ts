import type { User } from '@/domain/entities/user/user'

export class Response {
	public id: string
	public email: string
	public createdAt: number

	constructor(user: User) {
		this.id = user.id.value
		this.email = user.email.value
		this.createdAt = user.createdAt
	}
}
