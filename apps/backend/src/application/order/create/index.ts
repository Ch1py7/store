import { InvalidSizeLengthError, Order, ProductNotFoundError } from '@store/core'
import type { CreateCommand } from './command'

export class CreateOrder {
	private _crypto: Dependencies['crypto']
	private _productRepository: Dependencies['productRepository']
	private _orderRepository: Dependencies['orderRepository']

	constructor({
		crypto,
		productRepository,
		orderRepository,
	}: Pick<Dependencies, 'crypto' | 'productRepository' | 'orderRepository' | 'orderParser'>) {
		this._crypto = crypto
		this._productRepository = productRepository
		this._orderRepository = orderRepository
	}

	public async execute({ products, userId }: CreateCommand) {
		const productsOrder = await this.productsOrder(products)

		products.forEach((p) => {
			this._assertUniqueSize(p.size)
		})

		const productMap = new Map(products.map((prod) => [prod.id, prod]))

		productsOrder.forEach((p) => {
			const matchingProduct = productMap.get(p.id)
			if (matchingProduct) {
				p.decreaseStock(matchingProduct.quantity)
				p.changeSize(matchingProduct.size)
			}
		})

		const productsWithQuantity = productsOrder.map((p) => {
			const matchingProduct = productMap.get(p.id)
			if (!matchingProduct) {
				throw new ProductNotFoundError(`Product with name "${p.name}" not found`)
			}
			return { product: p, quantity: matchingProduct.quantity }
		})

		const order = new Order({
			id: this._crypto.randomUUID(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
			products: productsWithQuantity,
			status: 1,
			userId,
		})

		const productsDbModel = productsOrder.map((p) => ({
			id: p.id,
			stock: p.stock,
			updated_at: new Date().toISOString(),
		}))

		await this._orderRepository.saveOrderUpdateProduct(order, productsDbModel)
	}

	private async productsOrder(products: CreateCommand['products']) {
		const productOrders = await Promise.all(
			products.map(async ({ id }) => this._productRepository.findById(id))
		)

		if (productOrders.some((product) => !product)) {
			throw new ProductNotFoundError('One or more products were not found in the repository')
		}

		return productOrders
	}

	private _assertUniqueSize(value: number) {
		if (!Number.isInteger(value)) {
			throw new InvalidSizeLengthError('Size must be an integer number')
		}
	}
}
