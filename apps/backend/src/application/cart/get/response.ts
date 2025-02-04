import type { Cart } from '@store/core'

export class GetCartResponse {
	public products: Cart['products']
	public total: number

	constructor(cart: Cart) {
		this.products = cart.products
		this.total = cart.total
	}
}
