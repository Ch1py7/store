import type { GetOrderCommand } from './command'
import { GetOrderResponse } from './response'

export class GetOrder {
	private _orderRepository: Dependencies['orderRepository']

	constructor({ orderRepository }: Pick<Dependencies, 'orderRepository'>) {
		this._orderRepository = orderRepository
	}

	public async execute({ id }: GetOrderCommand) {
		const order = await this._orderRepository.findById(id)

		return new GetOrderResponse(order)
	}
}
