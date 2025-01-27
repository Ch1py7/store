import type { RegisterUser } from '@/application/register'
import type { AuthParser } from '@/infrastructure/parsers/AuthParser'
import type { UserAuthRepository } from '@/infrastructure/repository/user-auth-repository'
import type { CryptoCipher } from '@/infrastructure/security/crypto-cypher'
import type { supabaseClient } from '@/infrastructure/supabase/client'
import type { UserParser } from '@store/core'
import type crypto from 'node:crypto'

declare global {
	interface Dependencies {
		crypto: typeof crypto
		cipher: CryptoCipher

		// Use Cases
		registerUser: RegisterUser

		// DB
		supabaseClient: typeof supabaseClient

		// Repositories
		userAuthRepository: UserAuthRepository

		// Parser
		userParser: UserParser
		authParser: AuthParser
	}
}
