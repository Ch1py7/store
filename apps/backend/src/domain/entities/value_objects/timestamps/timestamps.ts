import { InvalidTimestampError } from './errors'

export class Timestamps {
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor(createdAt: number, updatedAt: number) {
		this._asserTimestamp(createdAt, 'createdAt')
		this._asserTimestamp(updatedAt, 'updatedAt')
		this._assertTemporalOrder(createdAt, updatedAt)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	private _asserTimestamp(value: number, name: 'createdAt' | 'updatedAt') {
		if (value <= 0) {
			throw new InvalidTimestampError(`Timestamp "${name}" must be a positive integer`)
		}
	}

	private _assertTemporalOrder(createdAt: number, updatedAt: number) {
		if (createdAt > updatedAt) {
			throw new InvalidTimestampError(`Timestamp "updatedAt" must be greater than "createdAt"`)
		}
	}
}
