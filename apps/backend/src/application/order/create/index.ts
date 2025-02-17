import { Order, ProductNotFoundError } from '@store/core'
import type { CreateCommand } from './command'

export class CreateOrder {
	private _crypto: Dependencies['crypto']
	private _productRepository: Dependencies['productRepository']
	private _orderRepository: Dependencies['orderRepository']
	private _inventoryRepository: Dependencies['inventoryRepository']

	constructor({
		crypto,
		productRepository,
		orderRepository,
		inventoryRepository,
	}: Pick<
		Dependencies,
		'crypto' | 'productRepository' | 'orderRepository' | 'orderParser' | 'inventoryRepository'
	>) {
		this._crypto = crypto
		this._productRepository = productRepository
		this._orderRepository = orderRepository
		this._inventoryRepository = inventoryRepository
	}

	public async execute({ products, userId }: CreateCommand) {
		const productsOrder = await this.productsOrder(products)

		const productsWithQuantity = productsOrder.map((p, i) => {
			return {
				id: p.id,
				name: p.name,
				quantity: products[i].quantity,
				price: p.price,
				percentageDiscount: p.percentageDiscount,
			}
		})

		const order = new Order({
			id: this._crypto.randomUUID(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
			products: productsWithQuantity,
			status: 1,
			userId,
		})

		const productQuantities = products.reduce(
			(acc, p) => {
				acc[p.id] = (acc[p.id] || 0) + p.quantity
				return acc
			},
			{} as Record<string, number>
		)

		const productsIds = products.map((p) => p.id)

		const inventories = await this._inventoryRepository.findByProductId(productsIds)

		const inventory = inventories.map((inv) => {
			const totalQuantity = productQuantities[inv.id] || 0
			inv.decreaseStock(totalQuantity)

			return {
				id: inv.id,
				stock: inv.stock,
				updated_at: new Date().toISOString(),
			}
		})

		await this._orderRepository.saveOrderUpdateProduct(order, inventory)
	}

	private async productsOrder(products: CreateCommand['products']) {
		const productsIds = products.map((p) => p.id)
		const productsOrder = await this._productRepository.findByIdsWithDiscount(productsIds)

		if (productsOrder.some((product) => !product)) {
			throw new ProductNotFoundError('One or more products were not found.')
		}

		return productsOrder
	}
}
