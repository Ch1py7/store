export class CreateSessionResponse {
	public access_token: string
	public refresh_token: string

	constructor({ access_token, refresh_token }: CreateConstructor) {
		this.access_token = access_token
		this.refresh_token = refresh_token
	}
}

interface CreateConstructor {
	access_token: string
	refresh_token: string
}
