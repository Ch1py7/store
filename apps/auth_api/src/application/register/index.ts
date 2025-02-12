import { Auth } from '@/domain/auth/auth'
import { Password } from '@/domain/auth/value_objects/password/password'
import { UserAuth } from '@/domain/user_auth/user-auth'
import type { Event } from '@/infrastructure/pubsub/pubsub-client'
import { EmailAlreadyExistsError, User } from '@store/core'
import type { CreateCommand } from './command'
import { CreateResponse } from './response'

export class RegisterUser {
	private _userAuthRepository: Dependencies['userAuthRepository']
	private _crypto: Dependencies['crypto']
	private _cipher: Dependencies['cipher']
	private _pubSubClient: Dependencies['pubSubClient']

	constructor({
		userAuthRepository,
		crypto,
		cipher,
		pubSubClient,
	}: Pick<Dependencies, 'userAuthRepository' | 'crypto' | 'cipher' | 'pubSubClient'>) {
		this._userAuthRepository = userAuthRepository
		this._crypto = crypto
		this._cipher = cipher
		this._pubSubClient = pubSubClient
	}

	public async execute(dto: CreateCommand) {
		const exists = await this._userAuthRepository.findByEmail(dto.email)

		this.assertEmailNotExists(exists)

		const { value: password } = new Password(dto.password)

		const { hashedPassword, salt } = this._cipher.hashPassword(password)

		const userId = this._crypto.randomUUID()

		const user = new User({
			email: dto.email,
			firstName: dto.firstName,
			lastName: dto.lastName,
			role: dto.role,
			verificationCode: '',
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
		await this._pubSubClient.publish(this.createCartCreatedEvent(userId, dto.cart))

		return new CreateResponse(user)
	}

	private createCartCreatedEvent(userId: string, cart: []): Event {
		return {
			meta: { type: 'user.user_created' },
			payload: { userId, cart },
		}
	}

	private assertEmailNotExists(user: Auth | null) {
		if (user) {
			throw new EmailAlreadyExistsError('Email is already registered.')
		}
	}
}
