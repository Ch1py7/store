interface IUpdate {
	firstName: string
	lastName: string
}

export class UpdateUserValidations {
	private _errorFields: Record<string, string> = {}
	private _data: IUpdate

	constructor(data: IUpdate) {
		this._data = data
	}

	public validate() {
		const { firstName, lastName } = this._data

		if (!firstName) this._errorFields.firstName = "Your first name can't be empty"
		if (!lastName) this._errorFields.lastName = "Your last name can't be empty"

		return this._errorFields
	}
}
