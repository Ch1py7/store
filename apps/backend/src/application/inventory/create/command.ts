export class CreateCommand {
	public productId: string
	public attributes: Record<string, string>
	public stock: number
	public category: number

	constructor({ productId, attributes, stock, category }: CommandConstructor) {
		this.productId = productId
		this.attributes = attributes
		this.stock = stock
		this.category = category
	}
}

interface CommandConstructor {
	productId: string
	attributes: Record<string, string>
	stock: number
	category: number
}
