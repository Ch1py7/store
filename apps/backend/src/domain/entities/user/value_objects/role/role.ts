import { InvalidRoleError } from './errors'

export class Role {
	public readonly value: string

	constructor(value: string) {
		this._assertIsValidRole(value)
		this.value = value
	}

	private _assertIsValidRole(value: string) {
		if (value !== 'admin' && value !== 'client') {
			throw new InvalidRoleError('The role must be admin or client.')
		}
	}
}
