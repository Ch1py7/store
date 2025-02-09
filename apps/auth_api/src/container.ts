import { UserParser } from '@store/core'
import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import { CreateSession } from './application/create_session'
import { LoginUser } from './application/login'
import { RefreshSessionSession } from './application/refresh_session'
import { RegisterUser } from './application/register'
import { config } from './infrastructure/config'
import { PubSubClient } from './infrastructure/pubsub/pubsub-client'
import { AuthParser } from './infrastructure/repositories/auth/auth-parser'
import { UserAuthRepository } from './infrastructure/repositories/auth/user-auth-repository'
import { CartRepository } from './infrastructure/repositories/cart/cart-repository'
import { RefreshTokenParser } from './infrastructure/repositories/tokens/tokens-parser'
import { TokensRepository } from './infrastructure/repositories/tokens/tokens-repository'
import { CryptoCipher } from './infrastructure/security/crypto-cypher'
import { supabaseClient } from './infrastructure/supabase/client'
import { RevokeSessionSession } from './application/revoke_session'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	crypto: asValue(crypto),
	cipher: asClass(CryptoCipher),
	config: asValue(config),

	// Use Cases
	registerUser: asClass(RegisterUser),
	loginUser: asClass(LoginUser),
	createSession: asClass(CreateSession),
	refreshSession: asClass(RefreshSessionSession),
	revokeSession: asClass(RevokeSessionSession),

	// DB
	supabaseClient: asValue(supabaseClient),

	// Repositories
	userAuthRepository: asClass(UserAuthRepository),
	cartRepository: asClass(CartRepository),
	tokensRepository: asClass(TokensRepository),

	// PubSub
	pubSubClient: asClass(PubSubClient),

	// Parser
	userParser: asClass(UserParser),
	authParser: asClass(AuthParser),
	refreshTokensParser: asClass(RefreshTokenParser),
})
