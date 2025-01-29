import type { User } from '@store/core'

export class GetUsersResponse {
	public users: {
		firstName: string
		lastName: string
		createdAt: number
		role: number
	}[]

	constructor(users: User[]) {
		this.users = users.map((user) => ({
			firstName: user.firstName,
			lastName: user.lastName,
			createdAt: user.createdAt,
			role: user.role,
		}))
	}
}
