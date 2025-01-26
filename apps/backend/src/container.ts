import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import { UserDomainService } from './domain/services/user/user-domain-service'
import { config } from './infrastructure/config'
import { CryptoCipher } from './infrastructure/security/crypto-cypher'
import { CreateUser } from './application/user/create'
import { prismaClient } from './infrastructure/prisma/prisma'
import { UserRepository } from './infrastructure/repositories/userRepository'
import { UserParser } from './infrastructure/parsers/UserParser'
import { UpdateUser } from './application/user/update'
import { DeleteUser } from './application/user/delete'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Use cases
	createUser: asClass(CreateUser),
	updateUser: asClass(UpdateUser),
	deleteUser: asClass(DeleteUser),

	// Services
	userService: asClass(UserDomainService),

	// DB
	prismaClient: asValue(prismaClient),

	// Libraries
	crypto: asValue(crypto),

	// Config
	config: asValue(config),

	// Repositories
	userRepository: asClass(UserRepository),

	// Security
	cipher: asClass(CryptoCipher).inject(() => ({
		privateKey: config.privateKey,
	})),

	// Parser
	userParser: asClass(UserParser)
})
