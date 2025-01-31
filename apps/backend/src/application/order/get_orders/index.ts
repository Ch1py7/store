import { GetOrdersResponse } from './response'

export class GetOrders {
	private _orderRepository: Dependencies['orderRepository']

	constructor({ orderRepository }: Pick<Dependencies, 'orderRepository'>) {
		this._orderRepository = orderRepository
	}

	public async execute() {
		const orders = await this._orderRepository.findAll()

		return new GetOrdersResponse(orders)
	}
}
