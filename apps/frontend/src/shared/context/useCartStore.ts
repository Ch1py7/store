import { create } from 'zustand'
import { getCart, updateCart } from '../service/localStorage'
import { CartService } from '../service/requests/cart'
import { getRequest, patchRequest } from '../service/requests/requests'
import { useAuthStore } from './useAuthStore'

export const useCartStore = create<CartState>((set, get) => ({
	cart: [],
	loading: true,
	total: 0,

	getCart: async () => {
		set({ loading: true })
		try {
			await new Promise<void>((resolve) => {
				const unsubscribe = useAuthStore.subscribe((state) => {
					if (!state.loading) {
						unsubscribe()
						resolve()
					}
				})
			})
			const user = useAuthStore.getState().user
			let cart: Product[] = []
			if (user) {
				const { response } = await getRequest<Response>(CartService.getCart)
				cart = response.data.products
				set({ total: response.data.total })
			} else {
				cart = getCart()
			}
			set({ cart })
			set((state) => ({ ...state, loading: false }))
		} catch {
			set({ cart: [], loading: false })
		}
	},

	updateCart: async () => {
		set({ loading: true })
		const { user } = useAuthStore.getState()
		let cart: Product[] = get().cart
		try {
			if (user) {
				const { response } = await patchRequest<Response>(CartService.updateCart, {
					products: cart,
				})
				cart = response.data.products
				set({ total: response.data.total })
			} else {
				updateCart(cart)
			}
			set({ cart })
		} catch {
			set({ cart: [] })
		} finally {
			get().getProductsQuantity()
			set({ loading: false })
		}
	},

	addProduct: (product: Omit<Product, 'quantity' | 'toCheckout'>) => {
		const cart = get().cart
		if (!cart) return
		const productIndex = cart.findIndex((item) => item.id === product.id)

		if (productIndex === -1) {
			cart.push({ ...product, quantity: 1, toCheckout: true })
		} else {
			cart[productIndex].quantity! += 1
		}
		set({ cart })
		get().updateCart()
	},

	restProduct: (product: Omit<Product, 'quantity' | 'toCheckout'>) => {
		const cart = get().cart
		if (!cart) return
		const productIndex = cart.findIndex((item) => item.id === product.id)

		if (productIndex === -1) return

		const updatedProducts = cart.map((item, index) =>
			index === productIndex ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
		)

		set({ cart: updatedProducts })
		get().updateCart()
	},

	removeProduct: (id: string) => {
		const cart = get().cart
		if (!cart) return
		const productIndex = cart.findIndex((item) => item.id === id)

		delete cart[productIndex]
		const newCart = cart.filter((_, index) => index !== productIndex)
		set({ cart: newCart })
		get().updateCart()
	},

	handleCheckout: (id: string) => {
		const cart = get().cart
		if (!cart) return
		const productIndex = cart.findIndex((p) => p.id === id)

		cart[productIndex].toCheckout = !cart[productIndex].toCheckout
		set({ cart })
		get().updateCart()
	},

	getProductQuantity: (id: string) => {
		const cart = get().cart
		if (!cart) return 0
		return cart.find((product) => product.id === id)?.quantity || 0
	},

	getProductsQuantity: () => {
		const cart = get().cart
		if (!cart) return 0
		return get().cart.reduce((prev, cur) => prev + cur.quantity, 0) || 0
	},
}))

export interface Product {
	id: string
	name: string
	price: number
	size: number
	quantity: number
	toCheckout: boolean
}

interface Response {
	data: { products: Product[]; total: number }
	message: string
}

interface CartState {
	cart: Product[]
	loading: boolean
	total: number
	handleCheckout: (id: string) => void
	getCart: () => Promise<void>
	updateCart: () => Promise<void>
	addProduct: (product: Omit<Product, 'quantity' | 'toCheckout'>) => void
	restProduct: (product: Omit<Product, 'quantity' | 'toCheckout'>) => void
	removeProduct: (id: string) => void
	getProductQuantity: (id: string) => number
	getProductsQuantity: () => number
}
