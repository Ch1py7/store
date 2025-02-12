import type { Product } from '../context/useCartStore'

const cartName = 'cart'

const saveCart = (products: Omit<Product, 'quantity' | 'toCheckout'>[]) => {
	localStorage.setItem(cartName, JSON.stringify(products))
}

export const getCart = (): Product[] => {
	const cart = localStorage.getItem(cartName)
	return cart ? JSON.parse(cart) : []
}

export const addProduct = (product: Omit<Product, 'quantity' | 'toCheckout'>) => {
	const cart = getCart()
	const productIndex = cart.findIndex((item) => item.id === product.id)

	if (productIndex === -1) {
		cart.push({ ...product, quantity: 1, toCheckout: true })
	} else {
		cart[productIndex].quantity += 1
	}

	saveCart(cart)
}

export const restProduct = (product: Omit<Product, 'quantity' | 'toCheckout'>) => {
	const cart = getCart()
	const productIndex = cart.findIndex((item) => item.id === product.id)

	cart[productIndex].quantity--

	saveCart(cart)
}

export const removeProduct = (id: Product['id']) => {
	const cart = getCart()
	const productIndex = cart.findIndex((item) => item.id === id)

	delete cart[productIndex]
	const newCart = cart.filter((_, index) => index !== productIndex)
	saveCart(newCart)
}

export const handleCheckout = (id: Product['id']) => {
	const cart = getCart()
	const productIndex = cart.findIndex((p) => p.id === id)

	cart[productIndex].toCheckout = !cart[productIndex].toCheckout
	saveCart(cart)
}
