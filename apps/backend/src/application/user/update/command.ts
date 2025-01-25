export class UpdateCommand {
	id: string
	firstName: string
	lastName: string

	constructor({ id, firstName, lastName }: CommandConstructor) {
		this.id = id
		this.firstName = firstName
		this.lastName = lastName
	}
}

interface CommandConstructor {
	id: string
	firstName: string
	lastName: string
}
