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

	public async findByIds(id: string[]) {
		const { data, error } = await this._supabaseClient
			.from('Product')
			.select('*')
			.in('id', id)

		if (error) throw error

		const domainData = data.map((d) => this._productParser.toDomain(d))
		return domainData
	}

	public async findAll(): Promise<ProductDomain[]> {
		const { data, error } = await this._supabaseClient.from('Product').select('*')

		if (error) throw error

		const domainModel = data.map((db) => this._productParser.toDomain(db))

		return domainModel
	}
}
