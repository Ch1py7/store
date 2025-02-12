export class InvalidSizeToShowError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidSizeToShowError'
	}
}
