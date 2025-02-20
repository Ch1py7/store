export class GetProductResponse {
	public name: string
	public description: string
	public price: number

	constructor({ name, description, price }: Product) {
		this.name = name
		this.description = description
		this.price = price
	}
}

interface Product {
	id: string
	name: string
	description: string
	updatedAt: number
	createdAt: number
	price: number
	category: number
	stock: number
	attributes: {
		attribute_name: string
		attribute_value: string
	}[]
}
