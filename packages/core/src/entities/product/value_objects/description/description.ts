import { InvalidDescriptionError } from './errors'

export class Description {
	public readonly value: string

	constructor(value: string) {
		this._assertDescription(value)
		this.value = value
	}

	private _assertDescription(value: string) {
		if (!value) {
			throw new InvalidDescriptionError('The description is required.')
		}
		if (value.length === 0 && value.length > 255) {
			throw new InvalidDescriptionError('The description must be between 1 and 255 characters.')
		}
	}
}
