interface IRegister {
	email: string
	password: string
}

export class LoginValidations {
	private _errorFields: Record<string, string> = {}
	private _data: IRegister

	constructor(data: IRegister) {
		this._data = data
	}

	public validate() {
		const { email, password } = this._data

		if (!email) this._errorFields.email = 'Enter your email'
		if (!password) this._errorFields.password = 'Enter your password'

		return this._errorFields
	}
}
