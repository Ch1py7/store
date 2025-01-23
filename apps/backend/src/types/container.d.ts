import type { UserRepository } from '@/domain/repositories/user-repository'
import type { Cipher } from '@/domain/services/cipher'
import type { UserDomainService } from '@/domain/services/user/user-domain-service'
import type crypto from 'node:crypto'
import type { config } from '../infrastructure/config/index'

declare global {
	interface Dependencies {
		// Use cases

		// Persistance

		// Services
		cipher: Cipher
		userService: UserDomainService

		// Repositories
		userRepository: UserRepository

		// Libraries
		crypto: typeof crypto

		// Config
		config: typeof config
	}
}
