import type { Products } from '../products/products'
import { InvalidTotalError } from './errors'

export class Total {
	public readonly value: number

	constructor(total: number, products: Products) {
		this._assertTotal(total, products.totalPrice)
		this.value = total
	}

	private _assertTotal(total: number, products: number) {
		if (total !== products) {
			throw new InvalidTotalError(
				'The total is invalid. This might indicate tampered or incorrect data.'
			)
		}
	}
}
