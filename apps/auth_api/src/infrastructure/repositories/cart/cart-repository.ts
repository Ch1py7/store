import type { ICartRepository } from '@/domain/repositories/cart-repository'
import type { Cart } from '@store/core'

export class CartRepository implements ICartRepository {
	private _supabaseClient: Dependencies['supabaseClient']

	constructor({ supabaseClient }: Pick<Dependencies, 'supabaseClient'>) {
		this._supabaseClient = supabaseClient
	}

	async assertCartExists(userId: string): Promise<boolean> {
		const { data } = await this._supabaseClient
			.from('Cart')
			.select('id')
			.eq('user_id', userId)
			.single()

		return Boolean(data)
	}
}
