export class CreateCommand {
	public productId: string
	public stock: number

	constructor({ productId, stock }: CommandConstructor) {
		this.productId = productId
		this.stock = stock
	}
}

interface CommandConstructor {
	productId: string
	stock: number
}
