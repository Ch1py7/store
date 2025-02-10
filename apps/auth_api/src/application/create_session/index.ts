import { RefreshToken } from '@/domain/refresh_tokens/refresh-tokens'
import type { CreateSessionCommand } from './command'
import { CreateSessionResponse } from './response'

export class CreateSession {
	private _cipher: Dependencies['cipher']
	private _tokensRepository: Dependencies['tokensRepository']

	constructor({ cipher, tokensRepository }: Pick<Dependencies, 'cipher' | 'tokensRepository'>) {
		this._cipher = cipher
		this._tokensRepository = tokensRepository
	}

	public async execute({ firstName, lastName, role, id }: CreateSessionCommand) {
		const accessToken_iat = Date.now()
		const accessToken_exp = accessToken_iat + 900000
		const access_token = this._cipher.signJwt({
			firstName,
			lastName,
			role,
			sub: id,
			iat: accessToken_iat,
			exp: accessToken_exp,
		})

		const refresh_token = this._cipher.randomString(64)

		const token = new RefreshToken({
			created_at: Date.now(),
			id: this._cipher.randomUUID(),
			isRevoked: false,
			refreshToken: refresh_token,
			userId: id,
		})

		await this._tokensRepository.revokeTokens(id)
		await this._tokensRepository.save(token)

		return new CreateSessionResponse({
			access_token,
			refresh_token,
		})
	}
}
