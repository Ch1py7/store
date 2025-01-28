export class CreateSessionResponse {
	public jwt: string

	constructor(jwt: string) {
		this.jwt = jwt
	}
}
