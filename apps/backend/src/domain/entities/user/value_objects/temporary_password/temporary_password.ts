import { InvalidTemporaryPasswordError } from './errors'

export class TemporaryPassword {
	private _value: string
	private _expirationTimestamp: number

	constructor(value: string) {
		if (!value || value.length < 8 || value.length > 25) {
			throw new InvalidTemporaryPasswordError('The password must be between 8 and 25 characters.')
		}
		this._value = value
		this._expirationTimestamp = Date.now() + 30 * 60 * 1000
	}

	get value(): string {
		return this._value
	}

	get expirationTimestamp(): number {
		return this._expirationTimestamp
	}

	isExpired(currentTimestamp: number = Date.now()): boolean {
		return currentTimestamp > this._expirationTimestamp
	}

	renew(newValue: string): TemporaryPassword {
		return new TemporaryPassword(newValue)
	}
}
