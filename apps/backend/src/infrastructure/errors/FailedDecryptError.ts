export class FailedDecryptError extends Error {
	constructor(message: string) {
		super()
		this.message = message
	}
}
