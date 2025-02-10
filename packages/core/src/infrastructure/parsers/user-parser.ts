import { User as UserDomain } from '@/entities/user'
import type { Database } from '@/infrastructure/supabase/supabase.types'

export class UserParser {
	toDomain(dbModel: Database['public']['Tables']['User']['Row']): UserDomain {
		return new UserDomain({
			id: dbModel.id,
			firstName: dbModel.first_name,
			lastName: dbModel.last_name,
			updatedAt: new Date(dbModel.updated_at).getTime(),
			createdAt: new Date(dbModel.created_at).getTime(),
			role: dbModel.role_id,
			verificationCode: dbModel.verification_code,
			email: dbModel.email,
		})
	}

	toDbModel(domainModel: UserDomain): Database['public']['Tables']['User']['Row'] {
		return {
			id: domainModel.id,
			first_name: domainModel.firstName,
			last_name: domainModel.lastName,
			is_verified: domainModel.isVerified!,
			created_at: new Date(domainModel.createdAt).toISOString(),
			updated_at: new Date(domainModel.updatedAt).toISOString(),
			email: domainModel.email,
			role_id: domainModel.role,
			verification_code: domainModel.verificationCode ?? '',
			is_deleted: domainModel.isDeleted!,
		}
	}
}
