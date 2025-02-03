import { PubSub } from '@google-cloud/pubsub'

export class PubSubClient {
	private _client: PubSub
	private _topicName = 'user_events'
	private _subscriptionName = 'user_events_subscription'

	constructor({ config }: Pick<Dependencies, 'config'>) {
		this._client = new PubSub({ projectId: config.server.pubsubId, credentials: {
			project_id: config.server.pubsubId,
			client_email: config.server.email,
			private_key: config.server.key
		} })
	}

	private async getTopic() {
		const [topics] = await this._client.getTopics()
		const topicExists = topics.some((t) => t.name.includes(this._topicName))

		if (!topicExists) {
			await this._client.createTopic(this._topicName)
		}

		return this._client.topic(this._topicName)
	}

	private async getSubscription() {
		const topic = await this.getTopic()
		const [subscriptions] = await topic.getSubscriptions()
		const subExists = subscriptions.some((s) => s.name.includes(this._subscriptionName))

		if (!subExists) {
			await topic.createSubscription(this._subscriptionName)
		}

		return this._client.subscription(this._subscriptionName)
	}

	public async publish(event: Event) {
		const topic = await this.getTopic()
		const dataBuffer = Buffer.from(JSON.stringify(event))

		await topic.publishMessage({ data: dataBuffer })
	}

	public async subscribe(onMessage: (data: any) => void) {
		const subscription = await this.getSubscription()

		subscription.on('message', (message) => {
			onMessage(JSON.parse(message.data.toString()))
			message.ack()
		})

		subscription.on('error', (error) => {
			console.log(`error: ${error.message}`)
		})
	}
}

export interface Event {
	meta: {
		type: string
	}
	payload: any
}
