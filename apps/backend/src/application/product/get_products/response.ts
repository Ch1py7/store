import type { Product } from '@store/core'

export class GetProductsResponse {
	public products: {
		id: string
		name: string
		description: string
		percentageDiscount: number
		price: number
		size: number[]
		sizeToShow: number
		stock: number
	}[]

	constructor(products: Product[]) {
		this.products = products.map(
			({ id, name, description, percentageDiscount, price, size, sizeToShow, stock }) => ({
				id: id,
				name: name,
				description: description,
				percentageDiscount: percentageDiscount,
				price: price,
				size: size,
				sizeToShow: sizeToShow,
				stock: stock,
			})
		)
	}
}
