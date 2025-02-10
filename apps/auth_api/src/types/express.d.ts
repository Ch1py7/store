// src/types/express.d.ts
import * as express from 'express'

declare global {
	namespace Express {
		interface Request {
			user?: {
				sub: string
				firstName: string
				lastName: string
				role: number
				iat: number
				exp: number
			}
		}
	}
}
