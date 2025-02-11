export class CreateCommand {
	firstName: string
	lastName: string
	email: string
	password: string
	role: number
	cart: []

	constructor({ firstName, lastName, email, password, role, cart }: CommandConstructor) {
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.password = password
		this.role = role
		this.cart = cart
	}
}

interface CommandConstructor {
	firstName: string
	lastName: string
	email: string
	password: string
	role: number
	cart: []
}
