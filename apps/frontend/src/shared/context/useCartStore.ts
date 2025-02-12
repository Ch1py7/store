import { create } from 'zustand'
import { CartService } from '../service/requests/cart'
import { getRequest, patchRequest } from '../service/requests/requests'

export const useCartStore = create<AuthState>((set, get) => ({
	cart: null,
	loading: true,

	getCart: async () => {
		set({ loading: true })

		try {
			const { response: data } = await getRequest<Response>(CartService.getCart)
			set({ cart: data.cart, loading: false })
		} catch {
			set({ cart: null, loading: false })
		}
	},

	updateCart: async () => {
		set({ loading: true })

		try {
			const cart = get().cart
			if (cart) {
				const { data } = await patchRequest<Response>(CartService.updateCart, cart)
				set({ cart: data.cart, loading: false })
			} else {
				set({ cart: null, loading: false })
			}
		} catch {
			set({ cart: null, loading: false })
		}
	},

	clearCart: () => {
		set({ cart: null })
	},

	addProduct: (product: Omit<Product, 'quantity' | 'toCheckout'>) => {
		const cart = get().cart
		if (!cart) return
		const productIndex = cart.products.findIndex((item) => item.id === product.id)

		if (productIndex === -1) {
			cart.products.push({ ...product, quantity: 1, toCheckout: true })
		} else {
			cart.products[productIndex].quantity! += 1
		}
		set({ cart: cart })
		get().updateCart()
	},

	getProductQuantity: (id: string) => {
		return get().cart?.products.find((product) => product.id === id)?.quantity || 0
	},

	getProductsQuantity: () => {
		return get().cart?.products.reduce((prev, cur) => prev + cur.quantity, 0) || 0
	},
}))

export interface Product {
	id: string
	name: string
	size: number
	price: number
	percentageDiscount: number
	quantity: number
	toCheckout: boolean
}

interface Cart {
	products: Product[]
	total: number
}

interface Response {
	cart: Cart
	message: string
}

interface AuthState {
	cart: Cart | null
	loading: boolean
	getCart: () => Promise<void>
	updateCart: () => Promise<void>
	clearCart: () => void
	addProduct: (product: Omit<Product, 'quantity' | 'toCheckout'>) => void
	getProductQuantity: (id: string) => number
	getProductsQuantity: () => number
}
