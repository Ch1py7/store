import { Attribute, Inventory, Product } from '@store/core'
import type { CreateCommand } from './command'
import { CreateResponse } from './response'

export class CreateProduct {
	private _crypto: Dependencies['crypto']
	private _productInventoryRepository: Dependencies['productInventoryRepository']

	constructor({
		crypto,
		productInventoryRepository,
	}: Pick<Dependencies, 'crypto' | 'productInventoryRepository'>) {
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

		const attribute = dto.attributes.map((atr) => {
			return new Attribute({
				id: this._crypto.randomUUID(),
				attributeName: atr.name,
				attributeValue: atr.value,
				category: dto.category,
				productId,
			})
		})

		const inventory = new Inventory({
			id: this._crypto.randomUUID(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
			productId,
			stock: dto.stock,
		})

		await this._productInventoryRepository.save(product, attribute, inventory)

		return new CreateResponse(product)
	}
}
