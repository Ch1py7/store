export class InvalidTotalError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidTotalError'
	}
}
