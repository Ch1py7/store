import type { CreateUser } from '@/application/user/create'
import type { UserRepository } from '@/domain/repositories/user-repository'
import type { UserDomainService } from '@/domain/services/user/user-domain-service'
import type { CryptoCipher } from '@/infrastructure/security/crypto-cypher'
import type crypto from 'node:crypto'
import type { config } from '../infrastructure/config/index'

declare global {
	interface Dependencies {
		// Use cases
		createUser: CreateUser
		// Persistance

		// Services
		cipher: CryptoCipher
		userService: UserDomainService

		// Repositories
		userRepository: UserRepository

		// Libraries
		crypto: typeof crypto

		// Config
		config: typeof config
	}
}
