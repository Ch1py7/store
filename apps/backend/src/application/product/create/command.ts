export class CreateCommand {
	public name: string
	public description: string
	public price: number
	public category: number
	public attributes: { name: string; value: string }[]
	public stock: number

	constructor({ name, description, price, category, attributes, stock }: CommandConstructor) {
		this.name = name
		this.description = description
		this.category = category
		this.price = price
		this.attributes = attributes
		this.stock = stock
	}
}

interface CommandConstructor {
	name: string
	description: string
	price: number
	category: number
	attributes: { name: string; value: string }[]
	stock: number
}
