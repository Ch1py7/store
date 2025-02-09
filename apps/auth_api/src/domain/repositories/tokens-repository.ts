import type { RefreshToken } from '../refresh_tokens/refresh-tokens'

export interface ITokensRepository {
	save(data: RefreshToken): Promise<void>
	revokeToken(token: string): Promise<void>
	revokeTokens(userId: string): Promise<void>
	getUserByToken(token: string): Promise<string>
}
