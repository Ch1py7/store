import { InvalidSizeError } from './errors'

export class Size {
	public readonly value: SizeConstructor[]

	constructor(value: SizeConstructor[]) {
		this._assertSize(value)
		this.value = value
	}

	private _assertSize(value: SizeConstructor[]) {
		if (!value) {
			throw new InvalidSizeError('Size is required.')
		}

		const isValidSize = value.every((size) => size >= 0 && size <= 7)
		if (!isValidSize) {
			throw new InvalidSizeError('All sizes must be between 0 and 7.')
		}

		if (value.includes(0) && value.length > 1) {
			throw new InvalidSizeError('If size includes 0, no other sizes are allowed.')
		}

		const uniqueSizes = new Set(value)
		if (uniqueSizes.size !== value.length) {
			throw new InvalidSizeError('Sizes must be unique.')
		}
	}
}

export type SizeConstructor = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7