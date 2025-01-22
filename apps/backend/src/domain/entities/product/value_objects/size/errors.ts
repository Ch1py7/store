export class InvalidSizeError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidPriceError'
	}
}
