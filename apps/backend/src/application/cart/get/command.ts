export class GetCartCommand {
	userId: string

	constructor({ userId }: CommandConstructor) {
		this.userId = userId
	}
}

interface CommandConstructor {
	userId: string
}
