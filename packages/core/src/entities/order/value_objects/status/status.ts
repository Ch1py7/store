import { InvalidStatusError } from './errors'

export class Status {
	public readonly value: number

	constructor(status: number) {
		this._assertValidStatus(status)
		this.value = status
	}

	private _assertValidStatus(status: number) {
		if (!status) {
			throw new InvalidStatusError('Status is required.')
		}

		const isValidStatus = status >= 0 && status <= 3
		if (!isValidStatus) {
			throw new InvalidStatusError('Status must be pending, completed or cancelled.')
		}
	}
}
