import type { CreateSession } from '@/application/create_session'
import type { LoginUser } from '@/application/login'
import type { RegisterUser } from '@/application/register'
import type { config } from '@/infrastructure/config/index'
import type { PubSubClient } from '@/infrastructure/pubsub/pubsub-client'
import type { AuthParser } from '@/infrastructure/repository/auth-parser'
import type { UserAuthRepository } from '@/infrastructure/repository/user-auth-repository'
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

		// DB
		supabaseClient: typeof supabaseClient

		// Repositories
		userAuthRepository: UserAuthRepository

		// PubSub
		pubSubClient: PubSubClient

		// Parser
		userParser: UserParser
		authParser: AuthParser
	}
}
