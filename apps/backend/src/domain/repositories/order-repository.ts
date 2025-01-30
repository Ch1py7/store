import type { Order as OrderDomain } from '@store/core'

export interface IOrderRepository {
	findOrdersByUserId(id: string): Promise<OrderDomain[]>
	findOrderById(id: string): Promise<OrderDomain>
	save(order: OrderDomain): Promise<void>
}
