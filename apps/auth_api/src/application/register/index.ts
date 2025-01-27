import { Auth } from '@/domain/auth/auth'
import { User } from '@store/core'
import type { CreateCommand } from './command'
import { CreateResponse } from './response'
import { Password } from '@/domain/auth/value_objects/password/password'
import { UserAuth } from '@/domain/user_auth/auth'
import { EmailAlreadyExistsError } from '@/domain/auth/value_objects/email/errors'

export class RegisterUser {
	private _userAuthRepository: Dependencies['userAuthRepository']
	private _crypto: Dependencies['crypto']
	private _cipher: Dependencies['cipher']

	constructor({ userAuthRepository, crypto, cipher }: Pick<Dependencies, 'userAuthRepository' | 'crypto' | 'cipher'>) {
		this._userAuthRepository = userAuthRepository
		this._crypto = crypto
		this._cipher = cipher
	}

	public async execute(dto: CreateCommand) {
		const exists = await this._userAuthRepository.emailExists(dto.email)

		if (exists) {
			throw new EmailAlreadyExistsError('Email already exists.')
		}

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
			userId
		})

		const userAuth = new UserAuth({user, auth})

		await this._userAuthRepository.save(userAuth)

		return new CreateResponse(user)
	}
}
