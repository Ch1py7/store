import type { IProductRepository } from '@/domain/repositories/product-repository'
import type { Product as ProductDomain } from '@store/core'

export class ProductRepository implements IProductRepository {
	private _supabaseClient: Dependencies['supabaseClient']
	private _productParser: Dependencies['productParser']

	constructor({
		supabaseClient,
		productParser,
	}: Pick<Dependencies, 'supabaseClient' | 'productParser'>) {
		this._supabaseClient = supabaseClient
		this._productParser = productParser
	}
	findByIdWitDiscount(id: string): Promise<ProductDomain> {
		throw new Error('Method not implemented.')
	}

	public async save(product: ProductDomain) {
		const { error } = await this._supabaseClient
			.from('Product')
			.insert(this._productParser.toDbModel(product))

		if (error) throw error
	}

	public async findById(id: string) {
		const { data, error } = await this._supabaseClient
			.from('Product')
			.select('*')
			.eq('id', id)
			.single()

		if (error) throw error

		return this._productParser.toDomain(data)
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

		const domainModel = data.map((db) => ({
			id: this._productParser.toDomain(db).id,
			name: this._productParser.toDomain(db).name,
			price: this._productParser.toDomain(db).price,
			description: this._productParser.toDomain(db).description,
			createdAt: this._productParser.toDomain(db).createdAt,
			updatedAt: this._productParser.toDomain(db).updatedAt,
			category: this._productParser.toDomain(db).category,
			stock: db.Inventory?.stock || 0,
			attributes: db.ProductAttributes ?? [],
		}))

		return domainModel
	}
}
