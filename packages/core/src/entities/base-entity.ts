import { ID } from './value_objects/id/id'
import { Timestamps } from './value_objects/timestamps/timestamps'

export class BaseEntity {
	protected readonly _id: ID
	protected _timestamps: Timestamps

	constructor(base: Base) {
		this._timestamps = new Timestamps(base.createdAt, base.updatedAt)
		this._id = new ID(base.id)
	}

	public get id() {
		return this._id.value
	}

	public get createdAt() {
		return this._timestamps.createdAt
	}

	public get updatedAt() {
		return this._timestamps.updatedAt
	}

	public set updatedAt(value: number) {
		this._timestamps = new Timestamps(this._timestamps.createdAt, value)
	}
}

export interface Base {
	id: string
	createdAt: number
	updatedAt: number
}
