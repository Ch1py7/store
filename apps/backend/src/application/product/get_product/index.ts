import type { GetProductCommand } from './command'
import { GetProductResponse } from './response'

export class GetProduct {
	private _productRepository: Dependencies['productRepository']

	constructor({ productRepository }: Pick<Dependencies, 'productRepository'>) {
		this._productRepository = productRepository
	}

	public async execute({ id }: GetProductCommand) {
		const user = await this._productRepository.findById(id)

		return new GetProductResponse(user)
	}
}
