import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import { UserDomainService } from './domain/services/user/user-domain-service'
import { config } from './infrastructure/config'
import { CryptoCipher } from './infrastructure/security/crypto-cypher'
import { CreateUser } from './application/user/create'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Use cases
	createUser: asClass(CreateUser),
	// Persistance
	// Services
	userService: asClass(UserDomainService),

	// Libraries
	crypto: asValue(crypto),

	// Config
	config: asValue(config),

	// Security
	cipher: asClass(CryptoCipher).inject(() => ({
		privateKey: config.privateKey,
	})),
})
