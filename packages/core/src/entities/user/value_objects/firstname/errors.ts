export class InvalidFirstNameError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidFirstNameError'
	}
}
