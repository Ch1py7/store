interface IRegister {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
	businessName: string
}

export class RegisterValidations {
	private _errorFields: Record<string, string> = {}
	private _data: IRegister
	private _isBusinessRegister: boolean

	constructor(data: IRegister, isBusinessRegister: boolean) {
		this._data = data
		this._isBusinessRegister = isBusinessRegister
	}

	public validate() {
		const { firstName, lastName, email, password, confirmPassword, businessName } = this._data

		if (this._isBusinessRegister && !businessName) {
			this._errorFields.businessName = 'Enter your business name'
		} else {
			if (!firstName) this._errorFields.firstName = 'Enter your first name'
			if (!lastName) this._errorFields.lastName = 'Enter your last name'
		}

		if (!email) this._errorFields.email = 'Enter your email'
		if (!password) this._errorFields.password = 'Enter your password'
		if (password !== confirmPassword) this._errorFields.confirmPassword = 'Passwords do not match'

		return this._errorFields
	}
}
