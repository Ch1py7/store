import { addProduct, getCart, getFavorites, handleFavorite } from '@/shared/service/localStorage'
import { createContext, useState } from 'react'

interface CartContextState {
	cart: ProductCart[]
	addToCart: (id: string) => void
	getProductQuantity: (id: string) => number
	getProductsQuantity: () => number
	handleFavorites: (id: string) => void
	favorites: string[]
}

interface CartProviderProps {
	children: React.ReactNode
}

const Context = createContext<CartContextState>({
	cart: [],
	addToCart: () => {},
	getProductQuantity: () => 0,
	getProductsQuantity: () => 0,
	handleFavorites: () => {},
	favorites: [],
})

const Provider: React.FC<CartProviderProps> = ({ children }) => {
	const [cart, setCart] = useState<ProductCart[]>(getCart())
	const [favorites, setFavorites] = useState<string[]>(getFavorites())

	const addToCart = (id: string) => {
		addProduct(id)
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

	return (
		<Context.Provider
			value={{
				getProductQuantity,
				addToCart,
				cart,
				handleFavorites,
				favorites,
				getProductsQuantity,
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
