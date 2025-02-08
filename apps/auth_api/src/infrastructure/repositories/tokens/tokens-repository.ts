import type { RefreshToken } from '@/domain/refresh_tokens/refresh-tokens'
import type { ITokensRepository } from '@/domain/repositories/tokens-repository'

export class TokensRepository implements ITokensRepository {
	private _supabaseClient: Dependencies['supabaseClient']
	private _refreshTokensParser: Dependencies['refreshTokensParser']

	constructor({
		supabaseClient,
		refreshTokensParser,
	}: Pick<Dependencies, 'supabaseClient' | 'refreshTokensParser'>) {
		this._supabaseClient = supabaseClient
		this._refreshTokensParser = refreshTokensParser
	}

	async save(token: RefreshToken) {
		const dbModel = this._refreshTokensParser.toDbModel(token)
		const { error } = await this._supabaseClient.from('RefreshToken').insert(dbModel)

		if (error) throw error
	}

	async revokeTokens(userId: string) {
		const { error } = await this._supabaseClient
			.from('RefreshToken')
			.update({ is_revoked: true })
			.eq('user_id', userId)
			.gt('expires_at', new Date(Date.now()).toISOString())

		if (error) throw error
	}

	async getUserByToken(token: string) {
		const { data, error } = await this._supabaseClient
			.from('RefreshToken')
			.select('user_id')
			.eq('refresh_token', token)
			.single()

		if (error) throw error

		return data.user_id
	}
}
