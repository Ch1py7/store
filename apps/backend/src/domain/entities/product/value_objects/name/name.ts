import { InvalidNameError } from './errors'

export class Name {
	public readonly value: string

	constructor(value: string) {
		this._assertName(value)
		this.value = value
	}

	private _assertName(value: string) {
		if (!value) {
			throw new InvalidNameError('The name is required.')
		}
		if (value.length <= 0 && value.length > 25) {
			throw new InvalidNameError('The name must be between 1 and 25 characters.')
		}
	}
}
