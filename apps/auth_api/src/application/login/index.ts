import type { Auth } from '@/domain/auth/auth'
import { EmailNotFoundError } from '@store/core'
import { InvalidPasswordError } from '@/domain/auth/value_objects/password/errors'
import type { LoginCommand } from './command'
import { LoginResponse } from './response'

export class LoginUser {
	private _userAuthRepository: Dependencies['userAuthRepository']
	private _cipher: Dependencies['cipher']

	constructor({
		userAuthRepository,
		cipher,
	}: Pick<Dependencies, 'userAuthRepository' | 'crypto' | 'cipher'>) {
		this._userAuthRepository = userAuthRepository
		this._cipher = cipher
	}

	public async execute(dto: LoginCommand) {
		const user = await this._userAuthRepository.findByEmail(dto.email)

		this.assertUserExists(user)

		const validPassword = this._cipher.verifyPassword(user.password, user.salt, dto.password)

		this.assertPasswordValid(validPassword)

		const session = await this._userAuthRepository.getSession(user.userId)

		return new LoginResponse(session)
	}

	private assertUserExists(user: Auth | null): asserts user is Auth {
		if (!user) {
			throw new EmailNotFoundError('Email not found.')
		}
	}

	private assertPasswordValid(valid: boolean) {
		if (!valid) {
			throw new InvalidPasswordError('Incorrect password.')
		}
	}
}
