import type { GetOrdersByUserIdCommand } from './command'
import { GetOrdersByUserIdResponse } from './response'

export class GetOrdersByUserId {
	private _orderRepository: Dependencies['orderRepository']

	constructor({ orderRepository }: Pick<Dependencies, 'orderRepository'>) {
		this._orderRepository = orderRepository
	}

	public async execute({ id }: GetOrdersByUserIdCommand) {
		const order = await this._orderRepository.findOrdersByUserId(id)

		return new GetOrdersByUserIdResponse(order)
	}
}
