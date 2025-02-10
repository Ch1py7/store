import { RefreshToken } from '@/domain/refresh_tokens/refresh-tokens'
import { UserNotFoundError } from '@store/core'
import type { RefreshSessionCommand } from './command'
import { RefreshSessionResponse } from './response'

export class RefreshSessionSession {
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

	public async execute({ refresh_token }: RefreshSessionCommand) {
		const userId = await this._tokensRepository.getUserByToken(refresh_token)
		this.assertUserExists(userId)

		const user = await this._userAuthRepository.getSession(userId)

		const iat = Date.now()
		const exp = iat + 900000
		const new_access_token = this._cipher.signJwt({
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role,
			sub: userId,
			iat,
			exp,
		})
		const new_refresh_token = this._cipher.randomString(64)

		const token = new RefreshToken({
			created_at: Date.now(),
			id: this._cipher.randomUUID(),
			isRevoked: false,
			refreshToken: new_refresh_token,
			userId,
		})

		await this._tokensRepository.revokeTokens(userId)
		await this._tokensRepository.save(token)

		return new RefreshSessionResponse({
			new_access_token,
			new_refresh_token,
		})
	}

	private assertUserExists(user: string) {
		if (!user) {
			throw new UserNotFoundError('User not found.')
		}
	}
}
