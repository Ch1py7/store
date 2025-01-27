import { InvalidLastNameError } from './errors'

export class LastName {
	public readonly value: string

	constructor(value: string) {
		this._assertFirstName(value)
		this.value = value
	}

	private _assertFirstName(value: string) {
		if (!value) {
			throw new InvalidLastNameError('The last name is required.')
		}
	}
}
