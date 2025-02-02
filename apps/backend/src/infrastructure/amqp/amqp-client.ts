import amqp from 'amqplib'

export class AMQPClient {
	private _config: Dependencies['config']
	private _EXCHANGE = 'user_events'
	private _client: amqp.Connection | null = null
	private _channel: amqp.Channel | null = null
	private _instance: amqp.Channel | null = null

	constructor({ config }: Pick<Dependencies, 'config'>) {
		this._config = config
	}

	public async _connect() {
		try {
			this._client = await amqp.connect(this._config.server.amqpUrl)
			this._channel = await this._client.createChannel()
			this._channel.assertExchange(this._EXCHANGE, 'topic', { durable: false })
			return this._channel
		} catch (error) {
			throw new Error(`Error in amqp connection: ${error}`)
		}
	}

	public async _createInstance() {
		if (!this._instance) {
			this._instance = await this._connect()
		}
		return this._instance
	}

	public async publish(event: Event) {
		const instance = await this._createInstance()
		await instance.publish(this._EXCHANGE, event.meta.type, event.toBuffer())
	}

	public async consume(key: string, onMessage: (msg: amqp.ConsumeMessage | null) => void) {
		const instance = await this._createInstance()
		const { queue } = await instance.assertQueue('', { exclusive: true })
		await instance.bindQueue(queue, this._EXCHANGE, key)
		instance.consume(queue, onMessage, { noAck: true })
	}
}

export interface Event {
	meta: {
		type: string
	}
	toBuffer: () => Buffer
}
