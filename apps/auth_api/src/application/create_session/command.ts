export class CreateSessionCommand {
	id: string
	firstName: string
	lastName: string
	email: string
	role: number

	constructor({ firstName, lastName, email, role, id }: CommandConstructor) {
		this.id = id
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.role = role
	}
}

interface CommandConstructor {
	id: string
	firstName: string
	lastName: string
	email: string
	role: number
}
