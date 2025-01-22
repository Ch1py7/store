import type crypto from 'node:crypto'
import type { config } from '../infrastructure/config/index'

declare global {
	interface Dependencies {
		// Use cases

		// Persistance

		// Services

		// Libraries
		crypto: typeof crypto


		// Config
		config: typeof config
	}
}
