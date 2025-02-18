import { Attribute as AttributeDomain, type Database } from '@store/core'

export class AttributeParser {
	toDomain(
		dbModel: Database['public']['Tables']['ProductAttributes']['Row'],
		category: number
	): AttributeDomain {
		return new AttributeDomain({
			id: dbModel.id,
			attributeName: dbModel.attribute_name,
			attributeValue: dbModel.attribute_value,
			category,
			productId: dbModel.product_id,
		})
	}

	toDbModel(
		domainModel: AttributeDomain
	): Database['public']['Tables']['ProductAttributes']['Row'] {
		return {
			id: domainModel.id,
			attribute_name: domainModel.attributeName,
			attribute_value: domainModel.attributeValue,
			product_id: domainModel.productId
		}
	}
}
