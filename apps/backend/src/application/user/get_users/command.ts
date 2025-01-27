export class DeleteCommand {
	id: string

	constructor({ id }: CommandConstructor) {
		this.id = id
	}
}

interface CommandConstructor {
	id: string
}
