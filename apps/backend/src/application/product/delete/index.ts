import type { DeleteCommand } from './command'

export class DeleteProduct {
	private _productRepository: Dependencies['productRepository']

	constructor({ productRepository }: Pick<Dependencies, 'productRepository'>) {
		this._productRepository = productRepository
	}

	public async execute({ id }: DeleteCommand) {
		await this._productRepository.delete(id)
	}
}
