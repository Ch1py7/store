import type { Product as ProductDomain } from '@store/core'

export interface IProductRepository {
	findAll(): Promise<ProductDomain[] | null>
	findById(id: string): Promise<ProductDomain>
	save(product: ProductDomain): Promise<void>
	findByIds(id: string[]): Promise<ProductDomain[]>
}
