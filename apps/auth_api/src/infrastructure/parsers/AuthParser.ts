import { Auth as AuthDomain } from '@/domain/auth/auth'
import type { Database } from '@/infrastructure/supabase/supabase.types'

export class AuthParser {
	toDomain(dbModel: Database['public']['Tables']['Auth']['Row']): AuthDomain {
		return new AuthDomain({
			id: dbModel.id,
			updatedAt: new Date(dbModel.updated_at).getTime(),
			createdAt: new Date(dbModel.created_at).getTime(),
			email: dbModel.email,
			password: dbModel.password,
			salt: dbModel.salt,
			userId: dbModel.user_id,
		})
	}

	toDbModel(domainModel: AuthDomain): Database['public']['Tables']['Auth']['Row'] {
		return {
			id: domainModel.id,
			created_at: new Date(domainModel.createdAt).toISOString(),
			updated_at: new Date(domainModel.updatedAt).toISOString(),
			email: domainModel.email,
			password: domainModel.password,
			salt: domainModel.salt,
			user_id: domainModel.userId,
		}
	}
}
