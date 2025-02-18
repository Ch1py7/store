import { Inventory } from '@store/core'
import type { CreateCommand } from './command'

export class CreateInventory {
	private _crypto: Dependencies['crypto']
	private _inventoryRepository: Dependencies['inventoryRepository']

	constructor({
		crypto,
		inventoryRepository,
	}: Pick<Dependencies, 'crypto' | 'inventoryRepository'>) {
		this._crypto = crypto
		this._inventoryRepository = inventoryRepository
	}

	public async execute(dto: CreateCommand) {
		const inventory = new Inventory({
			id: this._crypto.randomUUID(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
			productId: dto.productId,
			stock: dto.stock,
		})

		await this._inventoryRepository.save(inventory)
	}
}
