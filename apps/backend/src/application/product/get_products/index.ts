import { GetProductsResponse } from './response'

export class GetProducts {
	private _productRepository: Dependencies['productRepository']

	constructor({ productRepository }: Pick<Dependencies, 'productRepository'>) {
		this._productRepository = productRepository
	}

	public async execute() {
		const user = await this._productRepository.findAll()

		return new GetProductsResponse(user)
	}
}
