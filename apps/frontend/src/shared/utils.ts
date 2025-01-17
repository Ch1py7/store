export const getTotalCart = (cart: ProductCart[]) => {
	const total = cart.reduce((prev, curr) => prev + curr.quantity, 0)
	return total
}
