import type { Order, Product } from '@store/core'

export class GetOrderResponse {
	public createdAt: number
	public total: number
	public status: number
	public products: Order['products']

	constructor({ createdAt, total, status, products }: Order) {
		this.createdAt = createdAt
		this.total = total
		this.status = status
		this.products = products
	}
}
