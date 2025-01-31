import type { Database, Order as OrderDomain } from '@store/core'

export interface IOrderRepository {
	findAll(): Promise<OrderDomain[] | null>
	findById(id: string): Promise<OrderDomain>
	findOrdersByUserId(id: string): Promise<OrderDomain[]>
	saveOrderUpdateProduct(
		order: OrderDomain,
		product: Pick<Database['public']['Tables']['Product']['Row'], 'id' | 'stock' | 'updated_at'>[]
	): Promise<void>
}
