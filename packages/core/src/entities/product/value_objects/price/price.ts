import { InvalidPriceError } from './errors'

export class Price {
	public readonly value: number

	constructor(value: number) {
		this._assertPrice(value)
		this.value = value
	}

	private _assertPrice(value: number) {
		if (value <= 0) {
			throw new InvalidPriceError('Price must be greater than 0.')
		}
	}
}
