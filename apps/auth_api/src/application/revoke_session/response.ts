export class RefreshSessionResponse {
	public new_access_token: string
	public new_refresh_token: string

	constructor({ new_access_token, new_refresh_token }: RefreshSessionConstructor) {
		this.new_access_token = new_access_token
		this.new_refresh_token = new_refresh_token
	}
}

interface RefreshSessionConstructor {
	new_access_token: string
	new_refresh_token: string
}
