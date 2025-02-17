import type { IInventoryRepository } from '@/domain/repositories/inventory-repository'
import type { Inventory as InventoryDomain } from '@store/core'

export class InventoryRepository implements IInventoryRepository {
	private _supabaseClient: Dependencies['supabaseClient']
	private _inventoryParser: Dependencies['inventoryParser']

	constructor({
		supabaseClient,
		inventoryParser,
	}: Pick<Dependencies, 'supabaseClient' | 'inventoryParser'>) {
		this._supabaseClient = supabaseClient
		this._inventoryParser = inventoryParser
	}

	public async save(inventory: InventoryDomain) {
		const { error } = await this._supabaseClient
			.from('Inventory')
			.insert(this._inventoryParser.toDbModel(inventory))

		if (error) throw error
	}

	public async update(inventory: InventoryDomain) {
		const { error } = await this._supabaseClient
			.from('Inventory')
			.update(this._inventoryParser.toDbModel(inventory))
			.eq('product_id', inventory.productId)

		if (error) throw error
	}

	public async findById(id: string) {
		const { data, error } = await this._supabaseClient
			.from('Inventory')
			.select('*, Product(category)')
			.eq('id', id)
			.single()

		if (error) throw error

		return this._inventoryParser.toDomain(data, data.Product.category)
	}

	public async findByProductId(productId: string[]) {
		const { data, error } = await this._supabaseClient
			.from('Inventory')
			.select('*, Product(category)')
			.in('product_id', productId)

		if (error) throw error

		const domainModels = data.map((d) => this._inventoryParser.toDomain(d, d.Product.category))

		return domainModels
	}
}
