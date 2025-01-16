const cartName = 'cart'
const favoriteName = 'favorites'

const saveCart = (cart: ProductCart[]) => {
	localStorage.setItem(cartName, JSON.stringify(cart))
}

export const getCart = (): ProductCart[] => {
	const cart = localStorage.getItem(cartName)
	return cart ? JSON.parse(cart) : []
}

export const addProduct = (product: Product) => {
	const cart = getCart()
	const productIndex = cart.findIndex((item) => item.id === product.id)

	if (productIndex === -1) {
		cart.push({ ...product, quantity: 1 })
	} else {
		cart[productIndex].quantity += 1
	}

	saveCart(cart)
}

export const restProduct = (product: Product) => {
	const cart = getCart()
	const productIndex = cart.findIndex((item) => item.id === product.id)

  cart[productIndex].quantity --

	saveCart(cart)
}

export const removeProduct = (id: ProductCart['id']) => {
  const cart = getCart()
  const productIndex = cart.findIndex((item) => item.id === id)

  delete cart[productIndex]
  const newCart = cart.filter((_, index) => index !== productIndex)
  saveCart(newCart)
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
