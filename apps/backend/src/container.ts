import { InjectionMode, asValue, createContainer, asClass } from 'awilix'
import crypto from 'node:crypto'
import { IdGenerator } from './domain/services/id-generator'
import { config } from './infrastructure/config'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Use cases
	// Persistance
	// Libraries
	crypto: asValue(crypto),

	// Services
	idGenerator: asValue(IdGenerator),

	// Config
	config: asValue(config),
})
