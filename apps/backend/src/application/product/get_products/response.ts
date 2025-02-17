import type { Product } from '@store/core'

export class GetProductsResponse {
	public products: {
		id: string
		name: string
		description: string
		price: number
	}[]

	constructor(products: Product[]) {
		this.products = products.map(({ id, name, description, price }) => ({
			id: id,
			name: name,
			description: description,
			price: price,
		}))
	}
}
