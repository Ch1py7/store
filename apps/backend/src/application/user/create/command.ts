export class Command {
	firstName: string
	lastName: string
	email: string
	password: string

	constructor({ firstName, lastName, email, password }: CommandConstructor) {
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.password = password
	}
}

interface CommandConstructor {
	firstName: string
	lastName: string
	email: string
	password: string
}
