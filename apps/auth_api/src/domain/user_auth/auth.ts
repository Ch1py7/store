import { User } from '@store/core'
import type { Auth } from '../auth/auth'

export class UserAuth {
	private _auth: Auth
	private _user: User

	constructor({ auth, user }: UserAuthConstructor) {
		this._auth = auth
		this._user = new User(user)
	}

	get auth() {
		return this._auth
	}

	get user() {
		return this._user
	}
}

interface UserAuthConstructor {
	user: User
	auth: Auth
}
