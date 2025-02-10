import { Cart as CartDomain, type Database } from '@store/core'

export class CartParser {
	public toDomain(dbModel: Database['public']['Tables']['Cart']['Row']): CartDomain {
		return new CartDomain({
			id: dbModel.id,
			updatedAt: new Date(dbModel.updated_at).getTime(),
			createdAt: new Date(dbModel.created_at).getTime(),
			products: JSON.parse(JSON.stringify(dbModel.products)),
			userId: dbModel.user_id,
		})
	}

	public toDbModel(domainModel: CartDomain): Database['public']['Tables']['Cart']['Row'] {
		return {
			id: domainModel.id,
			updated_at: new Date(domainModel.updatedAt).toISOString(),
			created_at: new Date(domainModel.createdAt).toISOString(),
			products: JSON.parse(JSON.stringify(domainModel.products)),
			total: domainModel.total,
			user_id: domainModel.userId,
		}
	}
}
