import { InvalidFirstNameError } from './errors'

export class FirstName {
	public readonly value: string

	constructor(value: string) {
		this._assertFirstName(value)
		this.value = value
	}

	private _assertFirstName(value: string) {
		if (!value) {
			throw new InvalidFirstNameError('The first name is required.')
		}
	}
}
