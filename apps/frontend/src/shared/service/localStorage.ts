import type { Product } from '../context/useCartStore'

const cartName = 'cart'

export const updateCart = (products: Omit<Product, 'quantity' | 'toCheckout'>[]) => {
	localStorage.setItem(cartName, JSON.stringify(products))
}

export const getCart = (): Product[] => {
	const cart = localStorage.getItem(cartName)
	return cart ? JSON.parse(cart) : []
}
