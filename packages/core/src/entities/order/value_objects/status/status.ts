import { InvalidStatusError } from './errors'

export class Status {
	public readonly value: StatusConstructor

	constructor(status: StatusConstructor) {
		this._assertValidStatus(status)
		this.value = status
	}

	private _assertValidStatus(status: StatusConstructor) {
		if (!status) {
			throw new InvalidStatusError('Status is required.')
		}

		const isValidStatus = status >= 0 && status <= 3
		if (!isValidStatus) {
			throw new InvalidStatusError('Status must be pending, completed or cancelled.')
		}
	}
}

export type StatusConstructor = 1 | 2 | 3
