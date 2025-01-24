export class Command {
	firstName: string
	lastName: string
	email: string
	password: string
	role: 'admin' | 'client'

	constructor({ firstName, lastName, email, password, role }: CommandConstructor) {
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.password = password
		this.role = role
	}
}

interface CommandConstructor {
	firstName: string
	lastName: string
	email: string
	password: string
	role: 'admin' | 'client'
}
