export class InvalidProductsError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidProductsError'
	}
}
