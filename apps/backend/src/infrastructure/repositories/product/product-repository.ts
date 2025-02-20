import type { Product as ProductDomain } from '@store/core'

export class ProductRepository {
	private _supabaseClient: Dependencies['supabaseClient']
	private _productParser: Dependencies['productParser']
	private _inventoryParser: Dependencies['inventoryParser']
	private _attributeParser: Dependencies['attributeParser']

	constructor({
		supabaseClient,
		productParser,
		inventoryParser,
		attributeParser,
	}: Pick<
		Dependencies,
		'supabaseClient' | 'productParser' | 'inventoryParser' | 'attributeParser'
	>) {
		this._supabaseClient = supabaseClient
		this._productParser = productParser
		this._inventoryParser = inventoryParser
		this._attributeParser = attributeParser
	}

	public async save(product: ProductDomain) {
		const { error } = await this._supabaseClient
			.from('Product')
			.insert(this._productParser.toDbModel(product))

		if (error) throw error
	}

	public async update(product: ProductDomain) {
		const { error } = await this._supabaseClient
			.from('Product')
			.update(this._productParser.toDbModel(product))
			.eq('id', product.id)

		if (error) throw error
	}

	public async findById(id: string) {
		const { data, error } = await this._supabaseClient
			.from('Product')
			.select('*, Inventory(*), ProductAttributes(*)')
			.eq('id', id)
			.single()

		if (error) throw error

		const productDomain = this._productParser.toDomain(data)
		const inventoryDomain = this._inventoryParser.toDomain(data.Inventory!)
		const attributesDomain = data.ProductAttributes.map((db) =>
			this._attributeParser.toDomain(db!, data.category)
		)

		return {
			productDomain,
			inventoryDomain,
			attributesDomain,
		}
	}

	public async findByIds(id: string[]) {
		const { data, error } = await this._supabaseClient.from('Product').select('*').in('id', id)

		if (error) throw error

		const domainData = data.map((d) => this._productParser.toDomain(d))
		return domainData
	}

	public async findAll() {
		const { data, error } = await this._supabaseClient
			.from('Product')
			.select('*, Inventory(stock), ProductAttributes(attribute_name, attribute_value)')

		if (error) throw error

		const products = data.map((db) => {
			const domainModel = this._productParser.toDomain(db)
			return {
				id: domainModel.id,
				name: domainModel.name,
				description: domainModel.description,
				updatedAt: domainModel.updatedAt,
				createdAt: domainModel.createdAt,
				price: domainModel.price,
				category: domainModel.category,
				stock: db.Inventory?.stock || 0,
				attributes: db.ProductAttributes ?? [],
			}
		})

		return products
	}

	public async findByIdWithDiscount(id: string) {
		const { data, error } = await this._supabaseClient
			.from('Product')
			.select('*, Promotions(discount_percentage)')
			.eq('id', id)
			.single()

		if (error) throw error

		const domainModel = this._productParser.toDomain(data)
		return {
			id: domainModel.id,
			name: domainModel.name,
			price: domainModel.price,
			percentageDiscount: data.Promotions?.discount_percentage || 0,
		}
	}

	public async findByIdsWithDiscount(id: string[]) {
		const { data, error } = await this._supabaseClient
			.from('Product')
			.select('*, Promotions(discount_percentage)')
			.in('id', id)

		if (error) throw error

		const domainWithDiscount = data.map((d) => {
			const domainModel = this._productParser.toDomain(d)
			return {
				id: domainModel.id,
				name: domainModel.name,
				price: domainModel.price,
				percentageDiscount: d.Promotions?.discount_percentage || 0,
			}
		})

		return domainWithDiscount
	}
}
