import type { CreateUser } from '@/application/user/create'
import type { UpdateUser } from '@/application/user/update'
import type { UserDomainService } from '@/domain/services/user/user-domain-service'
import type { UserParser } from '@/infrastructure/parsers/UserParser'
import type { UserRepository } from '@/infrastructure/repositories/userRepository'
import type { CryptoCipher } from '@/infrastructure/security/crypto-cypher'
import type crypto from 'node:crypto'
import type { config } from '../infrastructure/config/index'
import type { prismaClient } from '../infrastructure/prisma/prisma'

declare global {
	interface Dependencies {
		// Use cases
		createUser: CreateUser
		updateUser: UpdateUser

		// DB
		prismaClient: typeof prismaClient

		// Services
		userService: UserDomainService

		// Repositories
		userRepository: UserRepository

		// Libraries
		crypto: typeof crypto

		// Config
		config: typeof config

		// Security
		cipher: CryptoCipher

		// Parser
		userParser: UserParser
	}
}
