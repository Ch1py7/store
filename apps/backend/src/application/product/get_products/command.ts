export class GetProductsCommand {
	search?: string

	constructor({ search }: CommandConstructor) {
		this.search = search
	}
}

interface CommandConstructor {
	search?: string
}
