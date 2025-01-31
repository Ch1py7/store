export class CreateCommand {
	public userId: string
	public products: {
		id: string
		quantity: number
		size: number
	}[]

	constructor({ userId, products }: CommandConstructor) {
		this.userId = userId
		this.products = products
	}
}

interface CommandConstructor {
	userId: string
	products: {
		id: string
		quantity: number
		size: number
	}[]
}
