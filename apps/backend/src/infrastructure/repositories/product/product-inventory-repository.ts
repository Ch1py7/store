import type { Inventory, Product, Attribute } from '@store/core'

export class ProductInventoryRepository {
	private _productParser: Dependencies['productParser']
	private _inventoryParser: Dependencies['inventoryParser']
	private _supabaseClient: Dependencies['supabaseClient']
	private _attributeParser: Dependencies['attributeParser']

	constructor({
		productParser,
		inventoryParser,
		supabaseClient,
		attributeParser
	}: Pick<Dependencies, 'productParser' | 'supabaseClient' | 'inventoryParser' | 'attributeParser'>) {
		this._productParser = productParser
		this._inventoryParser = inventoryParser
		this._supabaseClient = supabaseClient
		this._attributeParser = attributeParser
	}

	async save(product: Product, attributes: Attribute[], inventory: Inventory) {
		const inventoryData = this._inventoryParser.toDbModel(inventory)
		const productData = this._productParser.toDbModel(product)
		const attributeData = attributes.map((atr) => this._attributeParser.toDbModel(atr))


		const { error } = await this._supabaseClient.rpc('create_inventory_by_product', {
			inventory_table_data: inventoryData,
			attributes_table_data: attributeData,
			product_table_data: productData,
		})

		if (error) throw error
	}
}
