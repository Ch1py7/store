export class CreateSessionCommand {
	id: string
	firstName: string
	lastName: string
	role: number

	constructor({ firstName, lastName, role, id }: CommandConstructor) {
		this.id = id
		this.firstName = firstName
		this.lastName = lastName
		this.role = role
	}
}

interface CommandConstructor {
	id: string
	firstName: string
	lastName: string
	role: number
}
