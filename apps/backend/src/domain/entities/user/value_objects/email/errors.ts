export class InvalidEmailError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidEmailError'
	}
}

export class EmailAlreadyExistsError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'EmailAlreadyExistsError'
	}
}
