export class InvalidSizeError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidSizeError'
	}
}

export class InvalidSizeLengthError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidSizeLengthError'
	}
}
