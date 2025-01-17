const cartName = 'cart'
const favoriteName = 'favorites'

const saveCart = (products: ProductCart[] | Product[]) => {
	localStorage.setItem(cartName, JSON.stringify(products))
}

const saveFavorite = (products: ProductCart[] | Product[]) => {
	localStorage.setItem(favoriteName, JSON.stringify(products))
}

export const getCart = (): ProductCart[] => {
	const cart = localStorage.getItem(cartName)
	return cart ? JSON.parse(cart) : []
}

export const addProduct = (product: Product) => {
	const cart = getCart()
	const productIndex = cart.findIndex((item) => item.id === product.id)

	if (productIndex === -1) {
		cart.push({ ...product, quantity: 1, toCheckout: true })
	} else {
		cart[productIndex].quantity += 1
	}

	saveCart(cart)
}

export const restProduct = (product: Product) => {
	const cart = getCart()
	const productIndex = cart.findIndex((item) => item.id === product.id)

	cart[productIndex].quantity--

	saveCart(cart)
}

export const removeProduct = (id: ProductCart['id']) => {
	const cart = getCart()
	const productIndex = cart.findIndex((item) => item.id === id)

	delete cart[productIndex]
	const newCart = cart.filter((_, index) => index !== productIndex)
	saveCart(newCart)
}

export const handleCheckout = (id: ProductCart['id']) => {
	const cart = getCart()
	const productIndex = cart.findIndex((p) => p.id === id)

	cart[productIndex].toCheckout = !cart[productIndex].toCheckout
	saveCart(cart)
}

export const getFavorites = (): Product[] => {
	const favorite = localStorage.getItem(favoriteName)
	return favorite ? JSON.parse(favorite) : []
}

export const handleFavorite = (product: Product) => {
	const favorites = getFavorites()
	const productIndex = favorites.findIndex((fav) => fav.id === product.id)

	if (productIndex === -1) {
		favorites.push(product)
	} else {
		delete favorites[productIndex]
	}
	const favsNoNull = favorites.filter((_, index) => index !== productIndex)
	saveFavorite(favsNoNull)
}
