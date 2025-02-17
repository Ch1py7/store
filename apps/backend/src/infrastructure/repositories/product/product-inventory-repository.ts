import type { Inventory, Product } from '@store/core'

export class ProductInventoryRepository {
	private _productParser: Dependencies['productParser']
	private _inventoryParser: Dependencies['inventoryParser']
	private _supabaseClient: Dependencies['supabaseClient']

	constructor({
		productParser,
		inventoryParser,
		supabaseClient,
	}: Pick<Dependencies, 'productParser' | 'supabaseClient' | 'inventoryParser'>) {
		this._productParser = productParser
		this._inventoryParser = inventoryParser
		this._supabaseClient = supabaseClient
	}

	async save(product: Product, inventory: Inventory) {
		const inventoryData = this._inventoryParser.toDbModel(inventory)
		const productData = this._productParser.toDbModel(product)

		const { error } = await this._supabaseClient.rpc('create_inventory_by_product', {
			inventory_table_data: inventoryData,
			product_table_data: productData,
		})

		if (error) throw error
	}
}
