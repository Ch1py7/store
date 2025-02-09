import { RefreshToken } from '@/domain/refresh_tokens/refresh-tokens'
import { UserNotFoundError } from '@store/core'
import type { RevokeSessionCommand } from './command'
import { RefreshSessionResponse } from './response'

export class RevokeSessionSession {
	private _cipher: Dependencies['cipher']
	private _tokensRepository: Dependencies['tokensRepository']
	private _userAuthRepository: Dependencies['userAuthRepository']

	constructor({
		cipher,
		tokensRepository,
		userAuthRepository,
	}: Pick<Dependencies, 'cipher' | 'tokensRepository' | 'userAuthRepository'>) {
		this._cipher = cipher
		this._tokensRepository = tokensRepository
		this._userAuthRepository = userAuthRepository
	}

	public async execute({ refresh_token }: RevokeSessionCommand) {
		await this._tokensRepository.revokeToken(refresh_token)
	}
}
