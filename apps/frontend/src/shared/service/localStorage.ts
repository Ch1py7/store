const cartName = 'cart'
const favoriteName = 'favorites'

const saveCart = (cart: ProductCart[]) => {
	localStorage.setItem(cartName, JSON.stringify(cart))
}

export const getCart = (): ProductCart[] => {
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

const saveFavorites = (favorite: string[]) => {
	localStorage.setItem(favoriteName, JSON.stringify(favorite))
}

export const getFavorites = (): string[] => {
	const favorite = localStorage.getItem(favoriteName)
	return favorite ? JSON.parse(favorite) : []
}

export const handleFavorite = (id: string) => {
	const favorites = getFavorites()
	const productIndex = favorites.findIndex((fav) => fav === id)

	if (productIndex === -1) {
		favorites.push(id)
	} else {
		delete favorites[productIndex]
	}
	const favsNoNull = favorites.filter((_, index) => index !== productIndex)
	saveFavorites(favsNoNull)
}
