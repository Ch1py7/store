import type { GetCartCommand } from './command'
import { GetCartResponse } from './response'

export class GetCart {
	private _cartRepository: Dependencies['cartRepository']

	constructor({ cartRepository }: Pick<Dependencies, 'cartRepository'>) {
		this._cartRepository = cartRepository
	}

	public async execute({ userId }: GetCartCommand) {
		const cart = await this._cartRepository.findByUserId(userId)

		return new GetCartResponse(cart)
	}
}
