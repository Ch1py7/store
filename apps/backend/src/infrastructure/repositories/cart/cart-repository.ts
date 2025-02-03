import type { ICartRepository } from '@/domain/repositories/cart-repository'
import type { Cart } from '@store/core'

export class CartRepository implements ICartRepository {
	private _supabaseClient: Dependencies['supabaseClient']
	private _cartParser: Dependencies['cartParser']

	constructor({
		supabaseClient,
		cartParser,
	}: Pick<Dependencies, 'supabaseClient' | 'cartParser' | 'pubSubClient'>) {
		this._supabaseClient = supabaseClient
		this._cartParser = cartParser
	}

	async createCart(cart: Cart) {
		const { error } = await this._supabaseClient
			.from('Cart')
			.insert(this._cartParser.toDbModel(cart))

		if (error) throw error
	}

	async updateCart(cart: Cart) {
		const { error } = await this._supabaseClient
			.from('Cart')
			.update(this._cartParser.toDbModel(cart))
			.eq('user_id', cart.userId)

		if (error) throw error
	}

	async findByUserId(id: string) {
		const { data, error } = await this._supabaseClient
			.from('Cart')
			.select('*')
			.eq('user_id', id)
			.single()

		if (error) throw error

		return this._cartParser.toDomain(data)
	}
}
