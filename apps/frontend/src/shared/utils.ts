import type { Product } from './context/useCartStore'

export const getTotalCart = (cart: Product[]) => {
	const total = cart.reduce((prev, curr) => prev + curr.quantity, 0)
	return total
}

export const attributesParser = (attributes: {}) => {
	return Object.entries(attributes).map(([name, value]) => ({
		name,
		value,
	}))
}

export enum Roles {
	admin = 1,
	user = 2,
	guest = 0,
}

export enum ProductsCategories {
	Clothing = 1,
	Technology = 2,
	Reading = 3,
	HomeAndKitchen = 4,
	HealthAndBeauty = 5,
	ToysAndGames = 6,
}

export enum ClothingSizes {
	XS = 1,
	S = 2,
	M = 3,
	L = 4,
	XL = 5,
	XXL = 6,
	XXXL = 7,
}

export const getSize: Record<string, string> = {
	[ClothingSizes.XS]: 'XS',
	[ClothingSizes.S]: 'S',
	[ClothingSizes.M]: 'M',
	[ClothingSizes.L]: 'L',
	[ClothingSizes.XL]: 'XL',
	[ClothingSizes.XXL]: 'XXL',
	[ClothingSizes.XXXL]: 'XXXL',
}

export const getCategory: Record<string, string> = {
	[ProductsCategories.Clothing]: 'Clothing',
	[ProductsCategories.Technology]: 'Technology',
	[ProductsCategories.Reading]: 'Reading',
	[ProductsCategories.HomeAndKitchen]: 'Home and Kitchen',
	[ProductsCategories.HealthAndBeauty]: 'Health and Beauty',
	[ProductsCategories.ToysAndGames]: 'Toys and Games',
}
