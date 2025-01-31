import { InvalidProductsError } from './errors'

export class Products {
	private readonly _products: ProductOrder[]

	constructor(products: ProductOrder[]) {
		this._assertProducts(products)
		this._products = products
	}

	get products(): ProductOrder[] {
		return this._products
	}

	private _assertProducts(products: ProductOrder[]) {
		if (products.length === 0) {
			throw new InvalidProductsError('Products list cannot be empty')
		}
	}
}

export interface ProductOrder {
	id: string
	name: string
	size: number
	quantity: number
	price: number
	percentageDiscount: number
}
