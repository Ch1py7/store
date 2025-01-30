import type { IOrderRepository } from '@/domain/repositories/order-repository'
import type { Order } from '@store/core'

export class OrderRepository implements IOrderRepository {
	private _supabaseClient: Dependencies['supabaseClient']
	private _orderParser: Dependencies['orderParser']

	constructor({
		supabaseClient,
		orderParser,
	}: Pick<Dependencies, 'supabaseClient' | 'orderParser'>) {
		this._supabaseClient = supabaseClient
		this._orderParser = orderParser
	}
	async save(order: Order) {
		const dbModel = this._orderParser.toDbModel(order)

		const { error } = await this._supabaseClient.from('Order').insert(dbModel)

		if (error) throw error
	}

	async findOrdersByUserId(id: string) {
		const { data, error } = await this._supabaseClient.from('Order').select('*').eq('user_id', id)

		if (error) throw error

		const orders = data.map((db) => this._orderParser.toDomain(db))

		return orders
	}

	async findOrderById(id: string) {
		const { data, error } = await this._supabaseClient
			.from('Order')
			.select('*')
			.eq('user_id', id)
			.single()

		if (error) throw error

		return this._orderParser.toDomain(data)
	}
}
