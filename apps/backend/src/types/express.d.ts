// src/types/express.d.ts
import * as express from 'express'

declare global {
	namespace Express {
		interface Request {
			user?: {
				sub: string
				role: number
				iat: number
				exp: number
			}
		}
	}
}
