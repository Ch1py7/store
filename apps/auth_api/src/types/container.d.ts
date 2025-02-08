import type { CreateSession } from '@/application/create_session'
import type { LoginUser } from '@/application/login'
import type { RefreshSessionSession } from '@/application/refresh_session'
import type { RegisterUser } from '@/application/register'
import type { config } from '@/infrastructure/config/index'
import type { PubSubClient } from '@/infrastructure/pubsub/pubsub-client'
import type { AuthParser } from '@/infrastructure/repositories/auth/auth-parser'
import type { UserAuthRepository } from '@/infrastructure/repositories/auth/user-auth-repository'
import type { CartRepository } from '@/infrastructure/repositories/cart/cart-repository'
import type { RefreshTokenParser } from '@/infrastructure/repositories/tokens/tokens-parser'
import type { TokensRepository } from '@/infrastructure/repositories/tokens/tokens-repository'
import type { CryptoCipher } from '@/infrastructure/security/crypto-cypher'
import type { supabaseClient } from '@/infrastructure/supabase/client'
import type { UserParser } from '@store/core'
import type crypto from 'node:crypto'

declare global {
	interface Dependencies {
		crypto: typeof crypto
		cipher: CryptoCipher
		config: typeof config

		// Use Cases
		registerUser: RegisterUser
		loginUser: LoginUser
		createSession: CreateSession
		refreshSession: RefreshSessionSession

		// DB
		supabaseClient: typeof supabaseClient

		// Repositories
		userAuthRepository: UserAuthRepository
		cartRepository: CartRepository
		tokensRepository: TokensRepository

		// PubSub
		pubSubClient: PubSubClient

		// Parser
		userParser: UserParser
		authParser: AuthParser
		refreshTokensParser: RefreshTokenParser
	}
}
