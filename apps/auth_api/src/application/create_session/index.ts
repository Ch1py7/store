import type { CreateSessionCommand } from './command'
import { CreateSessionResponse } from './response'

export class CreateSession {
	private _cipher: Dependencies['cipher']

	constructor({ cipher }: Pick<Dependencies, 'cipher'>) {
		this._cipher = cipher
	}

	public async execute({ firstName, lastName, role, id: userId }: CreateSessionCommand) {
		const access_token = this._cipher.signJwt(
			{
				firstName,
				lastName,
				role,
				userId,
			},
			false
		)

		const refresh_token = this._cipher.signJwt(
			{
				firstName,
				lastName,
				role,
				userId,
			},
			true
		)

		return new CreateSessionResponse({ access_token, refresh_token })
	}
}
