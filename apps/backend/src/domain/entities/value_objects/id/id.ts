import { validate } from 'uuid'
import { InvalidIDError } from './errors'

export class ID {
	public readonly value: string

	constructor(value: string) {
		this._assertID(value)
		this.value = value
	}

	private _assertID(value: string) {
		if (validate(value)) {
			throw new InvalidIDError('Invalid UUID')
		}
	}
}
