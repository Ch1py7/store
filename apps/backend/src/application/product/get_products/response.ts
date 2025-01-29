import type { Product } from '@store/core'

export class GetProductsResponse {
	public products: {
		name: string
		description: string
		percentageDiscount: number
		price: number
		size: number[]
		stock: number
	}[]

	constructor(products: Product[]) {
		this.products = products.map(
			({ name, description, percentageDiscount, price, size, stock }) => ({
				name: name,
				description: description,
				percentageDiscount: percentageDiscount,
				price: price,
				size: size,
				stock: stock,
			})
		)
	}
}
