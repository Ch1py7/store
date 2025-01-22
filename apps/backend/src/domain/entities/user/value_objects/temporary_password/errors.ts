export class InvalidTemporaryPasswordError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidTemporaryPasswordError'
	}
}
