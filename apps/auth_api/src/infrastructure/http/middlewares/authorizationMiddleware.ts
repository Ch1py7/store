import { config } from '@/infrastructure/config'
import { CryptoCipher } from '@/infrastructure/security/crypto-cypher'
import type express from 'express'
import crypto from 'node:crypto'

export const authorization = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const token = req.cookies.access_token
	
	if (!token) {
		res.status(401).json({ error: 'Unauthorized' })
		return
	}

	const cipher = new CryptoCipher({ config, crypto })

	try {
		const decoded = cipher.verifyJwt(token)
		req.user = decoded 
		next()
	} catch (err) {
		res.status(401).json({ error: 'Invalid or expired access token' }) 
		return
	}
}
