import { Cart as CartDomain } from '@store/core'
import { randomUUID } from 'node:crypto'
import type { Event } from './pubsub-client'

export class PubSubListener {
	private _pubSubClient: Dependencies['pubSubClient']
	private _cartRepository: Dependencies['cartRepository']

	constructor({
		pubSubClient,
		cartRepository,
	}: Pick<Dependencies, 'pubSubClient' | 'cartRepository'>) {
		this._pubSubClient = pubSubClient
		this._cartRepository = cartRepository
	}

	public async connect() {
		this.onDomainEvent()
	}

	private onDomainEvent() {
		this.onUserCreated()
	}

	private onUserCreated() {
		this._pubSubClient.subscribe((data: Event<{ userId: string }>) => {
			if (data.meta.type === 'user.user_created') {
				this.cartCreation(data.payload.userId)
			}
		})
	}

	private cartCreation(userId: string) {
		const cart = new CartDomain({
			id: randomUUID().toString(),
			userId,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			products: [],
		})

		this._cartRepository.createCart(cart)
	}
}
