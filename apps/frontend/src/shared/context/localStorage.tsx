import {
	addProduct,
	getCart,
	getFavorites,
	handleCheckout,
	handleFavorite,
	removeProduct,
	restProduct,
} from '@/shared/service/localStorage'
import { createContext, useEffect, useState } from 'react'

interface CartContextState {
	cart: ProductCart[]
	addToCart: (product: Product) => void
	restToCart: (product: Product) => void
	removeToCart: (id: Product['id']) => void
	getProductQuantity: (id: string) => number
	getProductsQuantity: () => number
	handleFavorites: (id: string) => void
	handleCheckouts: (id: string) => void
	favorites: string[]
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
	handleFavorites: () => {},
	handleCheckouts: () => {},
	favorites: [],
	total: 0,
})

const Provider: React.FC<CartProviderProps> = ({ children }) => {
	const [cart, setCart] = useState<ProductCart[]>(getCart())
	const [favorites, setFavorites] = useState<string[]>(getFavorites())
	const [total, setTotal] = useState<number>(0)

	const addToCart = (product: Product) => {
		addProduct(product)
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

	const handleFavorites = (id: string) => {
		handleFavorite(id)
		setFavorites(getFavorites())
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
				handleFavorites,
        handleCheckouts,
				favorites,
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
