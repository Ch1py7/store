import type { Inventory as InventoryDomain } from '@store/core'

export interface IInventoryRepository {
	save(Inventory: InventoryDomain): Promise<void>
	update(Inventory: InventoryDomain): Promise<void>
	findById(id: string): Promise<InventoryDomain>
	findByProductId(productId: string[]): Promise<InventoryDomain[]>
}
