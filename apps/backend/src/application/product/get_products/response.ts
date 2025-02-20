export class GetProductsResponse {
	public products: {
		id: string
		name: string
		description: string
		updatedAt: number
		createdAt: number
		price: number
		category: number
		stock: number
		attributes: { attribute_name: string; attribute_value: string }[]
	}[]

	constructor(products: Products[]) {
		this.products = products.map(
			({ id, name, description, price, attributes, category, createdAt, stock, updatedAt }) => ({
				id: id,
				name: name,
				description: description,
				updatedAt: updatedAt,
				createdAt: createdAt,
				price: price,
				category: category,
				stock: stock,
				attributes: attributes,
			})
		)
	}
}

interface Products {
	id: string
	name: string
	description: string
	updatedAt: number
	createdAt: number
	price: number
	category: number
	stock: number
	attributes: { attribute_name: string; attribute_value: string }[]
}[]
