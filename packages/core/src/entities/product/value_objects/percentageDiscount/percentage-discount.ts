import { InvalidPercentageError } from './errors'

export class PercentageDiscount {
	public readonly value: number

	constructor(value: number) {
		this._assertPercentage(value)
		this.value = value
	}

	private _assertPercentage(value: number) {
		if (value < 0 || value > 100) {
			throw new InvalidPercentageError('Percentage of discount must be between 0 and 100.')
		}
	}
}
