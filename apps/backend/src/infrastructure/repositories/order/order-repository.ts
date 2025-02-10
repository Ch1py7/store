import type { IOrderRepository } from '@/domain/repositories/order-repository'
import type { Database, Order } from '@store/core'

export class OrderRepository implements IOrderRepository {
	private _supabaseClient: Dependencies['supabaseClient']
	private _orderParser: Dependencies['orderParser']

	constructor({
		supabaseClient,
		orderParser,
	}: Pick<Dependencies, 'supabaseClient' | 'orderParser' | 'productParser'>) {
		this._supabaseClient = supabaseClient
		this._orderParser = orderParser
	}
	async saveOrderUpdateProduct(
		order: Order,
		products: Pick<Database['public']['Tables']['Product']['Row'], 'id' | 'updated_at'>[]
	) {
		const { error } = await this._supabaseClient.rpc('update_product_from_order', {
			order_table_data: this._orderParser.toDbModel(order),
			product_table_data: products,
		})

		if (error) throw error
	}

	async findOrdersByUserId(id: string) {
		const { data, error } = await this._supabaseClient.from('Order').select('*').eq('user_id', id)

		if (error) throw error

		return data.map((db) => this._orderParser.toDomain(db))
	}

	async findById(id: string) {
		const { data, error } = await this._supabaseClient
			.from('Order')
			.select('*')
			.eq('id', id)
			.single()

		if (error) throw error

		return this._orderParser.toDomain(data)
	}

	async findAll() {
		const { data, error } = await this._supabaseClient.from('Order').select('*')

		if (error) throw error

		return data.map((db) => this._orderParser.toDomain(db))
	}
}
