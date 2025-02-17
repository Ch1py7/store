export class PromotionNotFoundError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'PromotionNotFoundError'
	}
}
