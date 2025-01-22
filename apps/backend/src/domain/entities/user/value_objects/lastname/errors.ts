export class InvalidLastNameError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidLastNameError'
	}
}
