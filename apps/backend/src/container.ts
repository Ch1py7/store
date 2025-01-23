import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import { Cipher } from './domain/services/cipher'
import { UserDomainService } from './domain/services/user/user-domain-service'
import { config } from './infrastructure/config'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Use cases
	// Persistance
	// Services
	cipher: asClass(Cipher),
	userService: asClass(UserDomainService),

	// Libraries
	crypto: asValue(crypto),

	// Config
	config: asValue(config),
})
