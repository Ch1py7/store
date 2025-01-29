import { Product } from '@store/core'
import type { CreateCommand } from './command'
import { CreateResponse } from './response'

export class CreateProduct {
	private _crypto: Dependencies['crypto']

	constructor({ crypto }: Pick<Dependencies, 'crypto'>) {
		this._crypto = crypto
	}

	public async execute(dto: CreateCommand) {
		const product = new Product({
			id: this._crypto.randomUUID(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
			name: dto.name,
			description: dto.description,
			percentageDiscount: dto.percentageDiscount,
			price: dto.price,
			size: dto.size,
			stock: dto.stock,
		})

		return new CreateResponse(product)
	}
}
