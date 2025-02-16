export class CreateCommand {
	public name: string
	public description: string
	public percentageDiscount: number
	public price: number
	public size: number[]
	public sizeToShow: number
	public stock: number
	public category: number

	constructor({ name, description, percentageDiscount, price, size, sizeToShow, stock, category }: CommandConstructor) {
		this.name = name
		this.description = description
		this.percentageDiscount = percentageDiscount
		this.price = price
		this.size = size
		this.sizeToShow = sizeToShow
		this.stock = stock
		this.category = category
	}
}

interface CommandConstructor {
	name: string
	description: string
	percentageDiscount: number
	price: number
	size: number[]
	sizeToShow: number
	stock: number
	category: number
}
