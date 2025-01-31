import { Order as OrderDomain, type Database } from '@store/core'

export class OrderParser {
	public toDomain(dbModel: Database['public']['Tables']['Order']['Row']): OrderDomain {
		return new OrderDomain({
			id: dbModel.id,
			updatedAt: new Date(dbModel.updated_at).getTime(),
			createdAt: new Date(dbModel.created_at).getTime(),
			products: JSON.parse(JSON.stringify(dbModel.products)),
			status: dbModel.status,
			userId: dbModel.user_id,
		})
	}

	public toDbModel(domainModel: OrderDomain): Database['public']['Tables']['Order']['Row'] {
		return {
			id: domainModel.id,
			updated_at: new Date(domainModel.updatedAt).toISOString(),
			created_at: new Date(domainModel.createdAt).toISOString(),
			products: JSON.parse(JSON.stringify(domainModel.products)),
			status: domainModel.status,
			total: domainModel.total,
			user_id: domainModel.userId,
		}
	}
}
