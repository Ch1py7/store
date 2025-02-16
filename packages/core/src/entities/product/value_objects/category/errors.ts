export class InvalidCategoryError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidCategoryError'
	}
}

export class InvalidCategoryTypeError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidCategoryTypeError'
	}
}
