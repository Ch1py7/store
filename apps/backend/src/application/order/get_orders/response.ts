import type { Order } from '@store/core'

export class GetOrdersResponse {
	public orders: {
		products: Order['products']
		total: Order['total']
		status: Order['status']
		createdAt: Order['createdAt']
	}[]

	constructor(orders: Order[]) {
		this.orders = orders.map((order) => ({
			products: order.products,
			total: order.total,
			status: order.status,
			createdAt: order.createdAt,
		}))
	}
}
