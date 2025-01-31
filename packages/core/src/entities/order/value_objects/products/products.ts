import type { Product } from '@/entities/product'
import { InvalidProductsError } from './errors'

export class Products {
	private readonly _products: Product[]

	constructor(products: Product[]) {
		if (!products.length) {
			throw new InvalidProductsError('The order must contain at least one product.')
		}
		this._products = products
	}

	get products(): Product[] {
		return this._products
	}
}
