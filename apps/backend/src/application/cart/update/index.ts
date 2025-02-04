import type { UpdateCommand } from './command'

export class UpdateCart {
	private _cartRepository: Dependencies['cartRepository']

	constructor({ cartRepository }: Pick<Dependencies, 'cartRepository'>) {
		this._cartRepository = cartRepository
	}

	public async execute({ products, userId }: UpdateCommand) {
		const cart = await this._cartRepository.findByUserId(userId)

		cart.updateProducts(products)

		await this._cartRepository.updateCart(cart)
	}
}
