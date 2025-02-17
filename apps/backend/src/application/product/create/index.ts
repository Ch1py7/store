import { Inventory, Product } from '@store/core'
import type { CreateCommand } from './command'
import { CreateResponse } from './response'

export class CreateProduct {
	private _crypto: Dependencies['crypto']
	private _productInventoryRepository: Dependencies['productInventoryRepository']

	constructor({ crypto, productInventoryRepository }: Pick<Dependencies, 'crypto' | 'productInventoryRepository'>) {
		this._crypto = crypto
		this._productInventoryRepository = productInventoryRepository
	}

	public async execute(dto: CreateCommand) {
		const productId = this._crypto.randomUUID()
		const product = new Product({
			id: productId,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			name: dto.name,
			description: dto.description,
			price: dto.price,
			category: dto.category,
		})
		
		const inventory = new Inventory({
			id: this._crypto.randomUUID(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
			attributes: dto.attributes,
			category: dto.category,
			productId,
			stock: dto.stock
		})

		await this._productInventoryRepository.save(product, inventory)

		return new CreateResponse(product)
	}
}
