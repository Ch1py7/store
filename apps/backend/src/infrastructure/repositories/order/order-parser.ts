import { Order as OrderDomain, type Database } from '@store/core'

export class OrderParser {
	toDomain(dbModel: Database['public']['Tables']['Order']['Row']): OrderDomain {
		return new OrderDomain({
			id: dbModel.id,
			updatedAt: new Date(dbModel.updated_at).getTime(),
			createdAt: new Date(dbModel.created_at).getTime(),
			products: JSON.parse(dbModel.products),
			status: dbModel.status,
			total: dbModel.total,
			userId: dbModel.user_id,
		})
	}

	toDbModel(domainModel: OrderDomain): Database['public']['Tables']['Order']['Row'] {
		return {
			id: domainModel.id,
			updated_at: new Date(domainModel.updatedAt).toISOString(),
			created_at: new Date(domainModel.createdAt).toISOString(),
			products: JSON.stringify(domainModel.products),
			status: domainModel.status,
			total: domainModel.total,
			user_id: domainModel.userId,
		}
	}
}
