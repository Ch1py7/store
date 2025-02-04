import type { Auth } from '@/domain/auth/auth'
import { InvalidPasswordError } from '@/domain/auth/value_objects/password/errors'
import type { Event } from '@/infrastructure/pubsub/pubsub-client'
import { EmailNotFoundError } from '@store/core'
import type { LoginCommand } from './command'
import { LoginResponse } from './response'

export class LoginUser {
	private _userAuthRepository: Dependencies['userAuthRepository']
	private _cartRepository: Dependencies['cartRepository']
	private _pubSubClient: Dependencies['pubSubClient']
	private _cipher: Dependencies['cipher']

	constructor({
		userAuthRepository,
		cartRepository,
		pubSubClient,
		cipher,
	}: Pick<
		Dependencies,
		'userAuthRepository' | 'crypto' | 'cipher' | 'cartRepository' | 'pubSubClient'
	>) {
		this._userAuthRepository = userAuthRepository
		this._cartRepository = cartRepository
		this._pubSubClient = pubSubClient
		this._cipher = cipher
	}

	public async execute(dto: LoginCommand) {
		const user = await this._userAuthRepository.findByEmail(dto.email)

		this.assertUserExists(user)

		const validPassword = this._cipher.verifyPassword(user.password, user.salt, dto.password)

		this.assertPasswordValid(validPassword)

		const session = await this._userAuthRepository.getSession(user.userId)

		const cart = await this._cartRepository.assertCartExists(user.userId)

		if (!cart) await this._pubSubClient.publish(this.createCartCreatedEvent(session.id))

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

	private createCartCreatedEvent(userId: string): Event {
		return {
			meta: { type: 'user.user_created' },
			payload: { userId },
		}
	}
}
