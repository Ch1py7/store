export class InvalidAttributeError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidAttributeError'
	}
}
