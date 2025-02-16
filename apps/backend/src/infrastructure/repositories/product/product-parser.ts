import { Product as ProductDomain, type Database } from '@store/core'

export class ProductParser {
	toDomain(dbModel: Database['public']['Tables']['Product']['Row']): ProductDomain {
		return new ProductDomain({
			id: dbModel.id,
			name: dbModel.name,
			description: dbModel.description,
			updatedAt: new Date(dbModel.updated_at).getTime(),
			createdAt: new Date(dbModel.created_at).getTime(),
			percentageDiscount: dbModel.percentageDiscount,
			price: dbModel.price,
			size: JSON.parse(dbModel.size),
			sizeToShow: dbModel.size_to_show,
			stock: dbModel.stock,
			category: dbModel.category
		})
	}

	toDbModel(domainModel: ProductDomain): Database['public']['Tables']['Product']['Row'] {
		return {
			id: domainModel.id,
			name: domainModel.name,
			description: domainModel.description,
			created_at: new Date(domainModel.createdAt).toISOString(),
			updated_at: new Date(domainModel.updatedAt).toISOString(),
			percentageDiscount: domainModel.percentageDiscount,
			price: domainModel.price,
			size: JSON.stringify(domainModel.size),
			size_to_show: domainModel.sizeToShow,
			stock: domainModel.stock,
			category: domainModel.category
		}
	}
}
