import { Product } from '@store/core'
import type { CreateCommand } from './command'
import { CreateResponse } from './response'

export class CreateProduct {
	private _crypto: Dependencies['crypto']
	private _productRepository: Dependencies['productRepository']

	constructor({ crypto, productRepository }: Pick<Dependencies, 'crypto' | 'productRepository'>) {
		this._crypto = crypto
		this._productRepository = productRepository
	}

	public async execute(dto: CreateCommand) {
		const product = new Product({
			id: this._crypto.randomUUID(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
			name: dto.name,
			description: dto.description,
			price: dto.price,
			category: dto.category,
		})

		await this._productRepository.save(product)

		return new CreateResponse(product)
	}
}
