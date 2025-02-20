import type { GetProductsCommand } from './command'
import { GetProductsResponse } from './response'

export class GetProducts {
	private _productRepository: Dependencies['productRepository']

	constructor({ productRepository }: Pick<Dependencies, 'productRepository'>) {
		this._productRepository = productRepository
	}

	public async execute({ search }: GetProductsCommand) {
		const user = await this._productRepository.findAll(search)

		return new GetProductsResponse(user)
	}
}
