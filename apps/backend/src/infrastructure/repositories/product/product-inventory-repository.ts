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
		const productData = this._productParser.toDbModel(product)
		const attributeData = attributes.map((atr) => this._attributeParser.toDbModel(atr))
		const inventoryData = this._inventoryParser.toDbModel(inventory)


		const { error } = await this._supabaseClient.rpc('create_inventory_by_product', {
			product_table_data: productData,
			attributes_table_data: attributeData,
			inventory_table_data: inventoryData,
		})

		if (error) throw error
	}
}
