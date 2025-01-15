const cartName = 'cart'
const favoriteName = 'favorites'

interface Product {
	id: string
	quantity: number
}

const saveCart = (cart: Product[]) => {
	localStorage.setItem(cartName, JSON.stringify(cart))
}

const getCart = (): Product[] => {
	const cart = localStorage.getItem(cartName)
	return cart ? JSON.parse(cart) : []
}

export const addProduct = (id: string) => {
	const cart = getCart()
	const productIndex = cart.findIndex((item) => item.id === id)

	if (productIndex === -1) {
		cart.push({ id, quantity: 1 })
	} else {
		cart[productIndex].quantity += 1
	}

	saveCart(cart)
}

const saveFavorite = (favorite: string[]) => {
	localStorage.setItem(favoriteName, JSON.stringify(favorite))
}

export const getFavorite = (): string[] => {
	const favorite = localStorage.getItem(favoriteName)
	return favorite ? JSON.parse(favorite) : []
}

export const handleFavorite = (id: string) => {
	const favorite = getFavorite()
	const productIndex = favorite.findIndex((fav) => fav === id)

	if (productIndex === -1) {
		favorite.push(id)
	} else {
		delete favorite[productIndex]
	}
	const favsNoNull = favorite.filter((_, index) => index !== productIndex)
	saveFavorite(favsNoNull)
}
