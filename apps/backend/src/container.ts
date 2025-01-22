import { InjectionMode, asValue, createContainer, asClass } from 'awilix'
import crypto from 'node:crypto'
import { config } from './infrastructure/config'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Use cases
	// Persistance
	// Libraries
	// Services
	crypto: asValue(crypto),

	// Config
	config: asValue(config),
})
