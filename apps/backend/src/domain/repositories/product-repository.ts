import type { Product as ProductDomain } from '@store/core'

export interface IProductRepository {
	findAll(): Promise<ProductWithStockAndAttributes[]>
	findById(id: string): Promise<ProductDomain>
	findByIdWithDiscount(id: string): Promise<{
		id: string
		name: string
		price: number
		percentageDiscount: number
	}>
	findByIdsWithDiscount(id: string[]): Promise<
		{
			id: string
			name: string
			price: number
			percentageDiscount: number
		}[]
	>
	save(product: ProductDomain): Promise<void>
	findByIds(id: string[]): Promise<ProductDomain[]>
}

type ProductWithStockAndAttributes = {
	id: string
	name: string
	description: string
	updatedAt: number
	createdAt: number
	price: number
	category: number
	stock: number
	attributes: { attribute_name: string; attribute_value: string }[]
}
