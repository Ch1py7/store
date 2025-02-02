import type { CreateSessionCommand } from './command'
import { CreateSessionResponse } from './response'

export class CreateSession {
	private _cipher: Dependencies['cipher']

	constructor({ cipher }: Pick<Dependencies, 'cipher'>) {
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
