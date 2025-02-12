import {
	addProduct,
	getCart,
	handleCheckout,
	removeProduct,
	restProduct,
} from '@/shared/service/localStorage'
import { createContext, useEffect, useState } from 'react'
import type { Product } from './useCartStore'

interface CartContextState {
	cart: Product[]
	addToCart: (product: Omit<Product, 'quantity' | 'toCheckout'>) => void
	restToCart: (product: Product) => void
	removeToCart: (id: Product['id']) => void
	getProductQuantity: (id: string) => number
	getProductsQuantity: () => number
	handleCheckouts: (id: string) => void
	total: number
}

interface CartProviderProps {
	children: React.ReactNode
}

const Context = createContext<CartContextState>({
	cart: [],
	addToCart: () => {},
	restToCart: () => {},
	removeToCart: () => {},
	getProductQuantity: () => 0,
	getProductsQuantity: () => 0,
	handleCheckouts: () => {},
	total: 0,
})

const Provider: React.FC<CartProviderProps> = ({ children }) => {
	const [cart, setCart] = useState<Product[]>(getCart())
	const [total, setTotal] = useState<number>(0)

	const addToCart = (product: Omit<Product, 'quantity' | 'toCheckout'>) => {
		addProduct({ ...product })
		setCart(getCart())
	}

	const restToCart = (product: Product) => {
		restProduct(product)
		setCart(getCart())
	}

	const removeToCart = (id: Product['id']) => {
		removeProduct(id)
		setCart(getCart())
	}

	const getProductQuantity = (id: string) => {
		const q = getCart().find((pc) => pc.id === id)?.quantity || 0
		return q
	}

	const getProductsQuantity = () => {
		const q = getCart().reduce((prev, cur) => prev + cur.quantity, 0)
		return q
	}

	const handleCheckouts = (id: string) => {
		handleCheckout(id)
		setCart(getCart())
	}

	useEffect(() => {
		const total = cart
			.filter((p) => p.toCheckout)
			.reduce((prev, cur) => prev + cur.quantity * cur.price, 0)
		setTotal(total)
	}, [cart])

	return (
		<Context.Provider
			value={{
				getProductQuantity,
				addToCart,
				restToCart,
				removeToCart,
				cart,
				handleCheckouts,
				getProductsQuantity,
				total,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export const LocalStorage = {
	Context,
	Provider,
}
