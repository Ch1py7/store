import type { Product } from './context/useCartStore'

export const getTotalCart = (cart: Product[]) => {
	const total = cart.reduce((prev, curr) => prev + curr.quantity, 0)
	return total
}

export enum Roles {
	admin = 1,
	user = 2,
	guest = 0,
}

export enum ProductsCategories {
	'Clothing' = 1,
	'Technology' = 2,
	'Reading' = 3,
	'HomeAndKitchen' = 4,
	'HealthAndBeauty' = 5,
	'ToysAndGames' = 6,
}

export enum ClothingSizes {
	'XS' = 1,
	'S' = 2,
	'M' = 3,
	'L' = 4,
	'XL' = 5,
	'XXL' = 6,
	'XXXL' = 7,
}

export const getSize = (value: number) => {
	switch (value) {
		case(ClothingSizes.XS): return 'XS'
		case(ClothingSizes.S): return 'S'
		case(ClothingSizes.M): return 'M'
		case(ClothingSizes.L): return 'L'
		case(ClothingSizes.XL): return 'XL'
		case(ClothingSizes.XXL): return 'XXL'
		case(ClothingSizes.XXXL): return 'XXXL'
	}
}
