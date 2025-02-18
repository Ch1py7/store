import { Inventory as InventoryDomain, type Database } from '@store/core'

export class InventoryParser {
	toDomain(
		dbModel: Database['public']['Tables']['Inventory']['Row'],
	): InventoryDomain {
		return new InventoryDomain({
			id: dbModel.id,
			updatedAt: new Date(dbModel.updated_at).getTime(),
			createdAt: new Date(dbModel.created_at).getTime(),
			productId: dbModel.product_id,
			stock: dbModel.stock, 
		})
	}

	toDbModel(domainModel: InventoryDomain): Database['public']['Tables']['Inventory']['Row'] {
		return {
			id: domainModel.id,
			created_at: new Date(domainModel.createdAt).toISOString(),
			product_id: domainModel.productId,
			stock: domainModel.stock,
			updated_at: new Date(domainModel.updatedAt).toISOString(), 
		}
	}
}
