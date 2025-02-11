import { Cart as CartDomain } from '@store/core'
import { randomUUID } from 'node:crypto'
import type { Event } from './pubsub-client'

export class PubSubListener {
	private _pubSubClient: Dependencies['pubSubClient']
	private _cartRepository: Dependencies['cartRepository']
	private _productRepository: Dependencies['productRepository']

	constructor({
		pubSubClient,
		cartRepository,
		productRepository,
	}: Pick<Dependencies, 'pubSubClient' | 'cartRepository' | 'productRepository'>) {
		this._pubSubClient = pubSubClient
		this._cartRepository = cartRepository
		this._productRepository = productRepository
	}

	public async connect() {
		this.onDomainEvent()
	}

	private onDomainEvent() {
		this.onUserCreated()
	}

	private onUserCreated() {
		this._pubSubClient.subscribe((data: Event<{ userId: string; cart: [] }>) => {
			if (data.meta.type === 'user.user_created') {
				this.cartCreation(data.payload.userId, data.payload.cart)
			}
		})
	}

	private async cartCreation(userId: string, products: Product[]) {
		try {
			const productIds = products.map((p) => p.id)
			const foundProducts = await this._productRepository.findByIds(productIds)
			const productMap = new Map(foundProducts.map((p) => [p.id, p]))
			const cartWithPrices = products.map(({ id, size, quantity }) => {
				const product = productMap.get(id)
				if (!product) throw new Error(`Product with ID ${id} not found`)
	
				return {
					id,
					name: product.name,
					size,
					quantity,
					price: product.price,
					percentageDiscount: product.percentageDiscount,
				}
			})
	
			const cart = new CartDomain({
				id: randomUUID().toString(),
				userId,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				products: cartWithPrices ? cartWithPrices : [],
			})
	
			this._cartRepository.createCart(cart)
		} catch (e) {
			console.log(e)
		}
	}
}

interface Product {
	id: string
	size: number
	quantity: number
}
