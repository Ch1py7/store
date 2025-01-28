import type { CreateSessionCommand } from './command'
import { CreateSessionResponse } from './response'

export class CreateSession {
	private _cipher: Dependencies['cipher']
	private _crypto: Dependencies['crypto']

	constructor({ cipher, crypto }: Pick<Dependencies, 'cipher' | 'crypto'>) {
		this._crypto = crypto
		this._cipher = cipher
	}

	public async execute({ firstName, lastName, role, id: sub }: CreateSessionCommand) {
		const iat = Date.now()
		const exp = iat + 86400000

		const token = this._cipher.signJwt({
			exp,
			sub,
			iat,
			firstName,
			lastName,
			role,
		})

		return new CreateSessionResponse(token)
	}
}
