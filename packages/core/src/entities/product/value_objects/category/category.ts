import { InvalidCategoryError, InvalidCategoryTypeError } from './errors'

export class Category {
	public readonly value: number

	constructor(value: number) {
		this._assertSize(value)
		this.value = value
	}

	private _assertSize(value: number) {
		if (!value) {
			throw new InvalidCategoryError('Category is required.')
		}

		if (!Number.isInteger(value)) {
			throw new InvalidCategoryTypeError('Invalid category type.')
		}
	}
}
