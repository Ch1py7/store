import type { Product } from '@store/core'

export class GetProductResponse {
	public name: string
	public description: string
	public percentageDiscount: number
	public price: number
	public size: number[]
	public stock: number

	constructor({ name, description, percentageDiscount, price, size, stock }: Product) {
		this.name = name
		this.description = description
		this.percentageDiscount = percentageDiscount
		this.price = price
		this.size = size
		this.stock = stock
	}
}
