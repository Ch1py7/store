import { InvalidSizeToShowError } from './errors'

export class SizeToShow {
	public readonly value: number

	constructor(value: number) {
		this._assertSize(value)
		this.value = value
	}

	private _assertSize(value: number) {
		if (!value) {
			throw new InvalidSizeToShowError('Size is required.')
		}

		const isValidSize = value >= 0 && value <= 7
		if (!isValidSize) {
			throw new InvalidSizeToShowError('Size must be between 0 and 7.')
		}
	}
}
