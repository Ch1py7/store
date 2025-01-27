export class LoginCommand {
	userId: string
	email: string
	password: string
	salt: string

	constructor({ userId, email, password, salt }: CommandConstructor) {
		this.userId = userId
		this.email = email
		this.password = password
		this.salt = salt
	}
}

interface CommandConstructor {
	userId: string
	email: string
	password: string
	salt: string
}
