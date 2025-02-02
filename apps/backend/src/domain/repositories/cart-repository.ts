import type { Cart as CartDomain } from '@store/core'

export interface ICartRepository {
	findByUserId(id: string): Promise<CartDomain>
	createCart(cart: CartDomain): Promise<void>
	updateCart(cart: CartDomain): Promise<void>
}
