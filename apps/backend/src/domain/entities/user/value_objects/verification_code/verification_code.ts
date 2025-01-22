import { InvalidVerificationCodeError } from './errors'

const regex = /^\d+$/

export class VerificationCode {
	private readonly _value: string
	private _expirationTimestamp: number

	constructor(value: string) {
		if (!value || value.length !== 6 || !regex.test(value)) {
			throw new InvalidVerificationCodeError('Verification code must be a 6-digit numeric string')
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

	isValid(code: string): boolean {
		return this._value === code
	}

	isExpired(currentTimestamp: number = Date.now()): boolean {
		return currentTimestamp > this._expirationTimestamp
	}
}
