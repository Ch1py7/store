export class RefreshTokenExpiredError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'RefreshTokenExpiredError'
	}
}

export class RefreshTokenRevokedError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'RefreshTokenRevokedError'
	}
}
