import type { Product } from './context/useCartStore'

export const getTotalCart = (cart: Product[]) => {
	const total = cart.reduce((prev, curr) => prev + curr.quantity, 0)
	return total
}

export enum Roles {
	admin = 1,
	user = 2,
	guest = 0,
}
