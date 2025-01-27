export class LoginCommand {
	email: string
	password: string

	constructor({ email, password }: CommandConstructor) {
		this.email = email
		this.password = password
	}
}

interface CommandConstructor {
	email: string
	password: string
}
