import type { Cart } from '@store/core'

export class UpdateCommand {
	userId: string
	products: Cart['products']

	constructor({ userId, products }: CommandConstructor) {
		this.userId = userId
		this.products = products
	}
}

interface CommandConstructor {
	userId: string
	products: Cart['products']
}
