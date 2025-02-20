import type { IAttributeRepository } from '@/domain/repositories/attribute-repository'
import type { Attribute as AttributeDomain } from '@store/core'

export class AttributeRepository implements IAttributeRepository {
	private _supabaseClient: Dependencies['supabaseClient']
	private _attributeParser: Dependencies['attributeParser']

	constructor({
		supabaseClient,
		attributeParser,
	}: Pick<Dependencies, 'supabaseClient' | 'attributeParser'>) {
		this._supabaseClient = supabaseClient
		this._attributeParser = attributeParser
	}

	public async save(attribute: AttributeDomain) {
		const { error } = await this._supabaseClient
			.from('ProductAttributes')
			.insert(this._attributeParser.toDbModel(attribute))

		if (error) throw error
	}

	public async update(attribute: AttributeDomain) {
		const { error } = await this._supabaseClient
			.from('ProductAttributes')
			.update(this._attributeParser.toDbModel(attribute))
			.eq('product_id', attribute.productId)

		if (error) throw error
	}

	public async updateByBatch(attributes: AttributeDomain[]) {
		const attributesDbModel = attributes.map((domain) => this._attributeParser.toDbModel(domain))

		const { error } = await this._supabaseClient
			.from('ProductAttributes')
			.upsert(attributesDbModel)

		if (error) throw error
	}
}
