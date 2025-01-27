export class InvalidIDError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidIDError'
	}
}
