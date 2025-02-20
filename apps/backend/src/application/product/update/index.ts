import type { UpdateCommand } from './command'

export class UpdateProduct {
	private _productRepository: Dependencies['productRepository']
	private _inventoryRepository: Dependencies['inventoryRepository']
	private _attributeRepository: Dependencies['attributeRepository']

	constructor({
		productRepository,
		inventoryRepository,
		attributeRepository,
	}: Pick<Dependencies, 'productRepository' | 'inventoryRepository' | 'attributeRepository'>) {
		this._productRepository = productRepository
		this._inventoryRepository = inventoryRepository
		this._attributeRepository = attributeRepository
	}

	public async execute(dto: UpdateCommand) {
		const { productDomain, inventoryDomain, attributesDomain } =
			await this._productRepository.findById(dto.id)

		productDomain.updateName(dto.name).updateDescription(dto.description).updatePrice(dto.price)
		inventoryDomain.updateStock(dto.stock)
		attributesDomain.forEach((atr, i) =>
			atr.updateName(dto.attributes[i].name).updateValue(dto.attributes[i].value)
		)

		await this._productRepository.update(productDomain)
		await this._inventoryRepository.update(inventoryDomain)
		await this._attributeRepository.updateByBatch(attributesDomain)
	}
}
