import type { IdGenerator } from '@/domain/services/id-generator'
import type crypto from 'node:crypto'
import type { config } from '../infrastructure/config/index'

declare global {
	interface Dependencies {
		// Use cases

		// Persistance

		// Libraries
		crypto: typeof crypto

		// Services
		idGenerator: typeof IdGenerator

		// Config
		config: typeof config
	}
}
