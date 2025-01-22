import { InvalidFirstNameError } from './errors'

export class FirstName {
	public readonly value: string

	constructor(value: string) {
		this._assertIsValidFirstName(value)
		this.value = value
	}

	private _assertIsValidFirstName(value: string) {
		if (!value) {
			throw new InvalidFirstNameError('The first name is required.')
		}
	}
}
