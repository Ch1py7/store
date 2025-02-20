import type { GetProductCommand } from './command'
import { GetProductResponse } from './response'

export class GetProduct {
	private _productRepository: Dependencies['productRepository']

	constructor({ productRepository }: Pick<Dependencies, 'productRepository'>) {
		this._productRepository = productRepository
	}

	public async execute({ id }: GetProductCommand) {
		const { productDomain, attributesDomain, inventoryDomain } =
			await this._productRepository.findById(id)

		const attributes = attributesDomain.map((atr) => ({
			attribute_name: atr.attributeName,
			attribute_value: atr.attributeValue,
		}))

		return new GetProductResponse({
			id,
			name: productDomain.name,
			description: productDomain.description,
			category: productDomain.category,
			price: productDomain.price,
			stock: inventoryDomain.stock,
			attributes,
			createdAt: productDomain.createdAt,
			updatedAt: productDomain.updatedAt,
		})
	}
}
