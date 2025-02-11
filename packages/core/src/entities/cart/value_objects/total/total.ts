import { InvalidTotalError } from './errors'

export class Total {
	public readonly value: number

	constructor(value: number) {
		this._assertTotal(value)
		this.value = Number(value.toFixed(2))
	}

	get total() {
		return this.value
	}

	private _assertTotal(value: number) {
		if (value < 0) {
			throw new InvalidTotalError('The total must be a non-negative integer.')
		}
	}
}
