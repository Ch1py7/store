import type { ICartRepository } from '@/domain/repositories/cart-repository'
import type { Cart } from '@store/core'

export class CartRepository implements ICartRepository {
	private _supabaseClient: Dependencies['supabaseClient']
	private _cartParser: Dependencies['cartParser']
	private _amqpClient: Dependencies['amqpClient']

	constructor({
		supabaseClient,
		cartParser,
		amqpClient,
	}: Pick<Dependencies, 'supabaseClient' | 'cartParser' | 'amqpClient'>) {
		this._supabaseClient = supabaseClient
		this._cartParser = cartParser
		this._amqpClient = amqpClient
	}

	public async connect() {
		this.onDomainEvent()
	}

	async createCart(cart: Cart) {
		const { error } = await this._supabaseClient
			.from('Cart')
			.insert(this._cartParser.toDbModel(cart))

		if (error) throw error
	}

	async updateCart(cart: Cart) {
		const { error } = await this._supabaseClient
			.from('Cart')
			.update(this._cartParser.toDbModel(cart))
			.eq('user_id', cart.userId)

		if (error) throw error
	}

	async findByUserId(id: string) {
		const { data, error } = await this._supabaseClient
			.from('Cart')
			.select('*')
			.eq('user_id', id)
			.single()

		if (error) throw error

		return this._cartParser.toDomain(data)
	}

	private onDomainEvent() {
		this.onUserCreated()
		// this._onUserDisabled()
	}

	private onUserCreated() {
		this._amqpClient.consume('user.user_created', async (message) => {
			if (message) {
				const content = JSON.parse(message.content.toString())
				const user = content.payload.user
				console.log(user)
				// await this.createCart.join(user.username)
				// await this._client.say(
				// 	user.username,
				// 	`@${user.username}, ahora podrás encontrarme en tu canal afordiLove!`
				// )
			}
		})
	}

	// _onUserDisabled() {
	// 	this._amqpClient.consume('user.user_disabled', async (message) => {
	// 		const content = JSON.parse(message.content.toString())
	// 		const command = new FindUserByIdCommand(content.payload.userId)
	// 		const response = await this._findUserById.execute(command)
	// 		await this._client.part(response.user.username)
	// 		await this._client.say(
	// 			response.user.username,
	// 			`@${response.user.username}, desde ahora no estaré en tu canal afordiSad`
	// 		)
	// 	})
	// }
}
