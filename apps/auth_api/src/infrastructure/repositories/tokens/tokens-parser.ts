import { RefreshToken as RefreshTokenDomain } from '@/domain/refresh_tokens/refresh-tokens'
import type { Database } from '@store/core'

export class RefreshTokenParser {
	toDomain(dbModel: Database['public']['Tables']['RefreshToken']['Row']): RefreshTokenDomain {
		return new RefreshTokenDomain({
			id: dbModel.id,
			created_at: new Date(dbModel.created_at).getTime(),
			isRevoked: dbModel.is_revoked,
			refreshToken: dbModel.refresh_token,
			userId: dbModel.user_id,
		})
	}

	toDbModel(domainModel: RefreshTokenDomain): Database['public']['Tables']['RefreshToken']['Row'] {
		return {
			created_at: new Date(domainModel.created_at).toISOString(),
			expires_at: new Date(domainModel.expires_at).toISOString(),
			id: domainModel.id,
			is_revoked: domainModel.isRevoked,
			refresh_token: domainModel.refreshToken,
			user_id: domainModel.userId,
		}
	}
}
