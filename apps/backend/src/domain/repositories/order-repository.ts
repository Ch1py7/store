import type { Database, Order as OrderDomain } from '@store/core'

export interface IOrderRepository {
	findOrdersByUserId(id: string): Promise<OrderDomain[]>
	findOrderById(id: string): Promise<OrderDomain>
	saveOrderUpdateProduct(
		order: OrderDomain,
		product: Pick<Database['public']['Tables']['Product']['Row'], 'id' | 'stock' | 'updated_at'>[]
	): Promise<void>
}
