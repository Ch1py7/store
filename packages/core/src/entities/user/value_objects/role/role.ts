import { InvalidRoleError } from './errors'

export class Role {
	public readonly value: number

	constructor(value: number) {
		this._assertRole(value)
		this.value = value
	}

	private _assertRole(value: number) {
		if (!value) {
			throw new InvalidRoleError('The role must be admin or client.')
		}
	}
}
