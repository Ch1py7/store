import { InvalidPasswordError } from './errors'

export class Password {
	public readonly value: string

	constructor(value: string) {
		this._assertPassword(value)
		this.value = value
	}

	private _assertPassword(value: string) {
		if (typeof value !== 'string' || !value || value.length < 8 || value.length > 25) {
			throw new InvalidPasswordError(
				'The password is required and must be between 8 and 25 characters.'
			)
		}
	}
}
