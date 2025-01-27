import { Auth } from '@/domain/auth/auth'
import { EmailAlreadyExistsError } from '@/domain/auth/value_objects/email/errors'
import { Password } from '@/domain/auth/value_objects/password/password'
import { UserAuth } from '@/domain/user_auth/auth'
import { User } from '@store/core'
import type { CreateCommand } from './command'
import { CreateResponse } from './response'

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

	public async execute(dto: CreateCommand) {
		const { email } = await this._userAuthRepository.findByEmail(dto.email)

		this.assertEmailNotExists(email)

		const { value: password } = new Password(dto.password)

		const { hashedPassword, salt } = this._cipher.hashPassword(password)

		const userId = this._crypto.randomUUID()

		const user = new User({
			...dto,
			id: userId,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			isDeleted: false,
			isVerified: false,
		})

		const auth = new Auth({
			id: this._crypto.randomUUID(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
			email: dto.email,
			password: hashedPassword,
			salt,
			userId,
		})

		const userAuth = new UserAuth({ user, auth })

		await this._userAuthRepository.save(userAuth)

		// TODO: configure to return updated jwt
		return new CreateResponse(user)
	}

	private assertEmailNotExists(email: string) {
		if (!email) {
			throw new EmailAlreadyExistsError('Email not found.')
		}
	}
}
