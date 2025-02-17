export class InvalidAttributesError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidAttributesError'
	}
}
