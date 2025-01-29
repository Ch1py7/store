export class CreateCommand {
	public name: string
	public description: string
	public percentageDiscount: number
	public price: number
	public size: number[]
	public stock: number

	constructor({ name, description, percentageDiscount, price, size, stock }: CommandConstructor) {
		this.name = name
		this.description = description
		this.percentageDiscount = percentageDiscount
		this.price = price
		this.size = size
		this.stock = stock
	}
}

interface CommandConstructor {
	name: string
	description: string
	percentageDiscount: number
	price: number
	size: number[]
	stock: number
}
