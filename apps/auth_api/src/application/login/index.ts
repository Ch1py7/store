import { EmailNotFoundError } from '@/domain/auth/value_objects/email/errors'
import { Password } from '@/domain/auth/value_objects/password/password'
import type { LoginCommand } from './command'
import { InvalidPasswordError } from '@/domain/auth/value_objects/password/errors'

export class RegisterUser {
	private _userAuthRepository: Dependencies['userAuthRepository']
	private _crypto: Dependencies['crypto']
	private _cipher: Dependencies['cipher']

	constructor({
		userAuthRepository,
		crypto,
		cipher,
	}: Pick<Dependencies, 'userAuthRepository' | 'crypto' | 'cipher'>) {
		this._userAuthRepository = userAuthRepository
		this._crypto = crypto
		this._cipher = cipher
	}

	public async execute(dto: LoginCommand) {
		const { email, password, salt, userId } = await this._userAuthRepository.findByEmail(dto.email)

		this.assertUserExists(email)
    
    const validPassword = this._cipher.verifyPassword(password, salt, dto.password)

    this.assertPasswordValid(validPassword)

    this._userAuthRepository.getSession(userId)

		// TODO: configure to return updated jwt
	}

  private assertUserExists(email: string) {
    if (!email) {
			throw new EmailNotFoundError('Email not found.')
		}
  }

  private assertPasswordValid(valid: boolean) {
    if (!valid) {
			throw new InvalidPasswordError('Incorrect password.')
		}
  }
}
