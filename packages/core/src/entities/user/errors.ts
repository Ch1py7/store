export class InvalidUserError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidUserError'
	}
}

export class UserNotFoundError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'UserNotFoundError'
	}
}
