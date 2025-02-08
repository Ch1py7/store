export class RefreshToken {
	private _id: string
	private _userId: string
	private _refreshToken: string
	private _isRevoked: boolean
	private _created_at: number
	private _expires_at: number

	constructor(refreshToken: IRefreshTokenConstructor) {
		this._id = refreshToken.id
		this._userId = refreshToken.userId
		this._refreshToken = refreshToken.refreshToken
		this._isRevoked = refreshToken.isRevoked
		this._created_at = refreshToken.created_at
		this._expires_at = refreshToken.created_at + 86400000
	}

	get id() {
		return this._id
	}

	get userId() {
		return this._userId
	}

	get refreshToken() {
		return this._refreshToken
	}

	get isRevoked() {
		return this._isRevoked
	}

	get created_at() {
		return this._created_at
	}

	get expires_at() {
		return this._expires_at
	}
}

interface IRefreshTokenConstructor {
	id: string
	userId: string
	refreshToken: string
	isRevoked: boolean
	created_at: number
}
