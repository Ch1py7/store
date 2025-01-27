import { BaseEntity, type Base } from '@store/core'
import { Password } from './value_objects/password/password'
import { Email } from './value_objects/email/email'

export class Auth extends BaseEntity {
	private _userId: string
	private _email: Email
	private _password: string
	private _salt: string

	constructor(auth: IAuthConstructor) {
		super({ createdAt: auth.createdAt, updatedAt: auth.updatedAt, id: auth.id })
		this._userId = auth.userId
		this._email = new Email(auth.email)
		this._password = auth.password
		this._salt = auth.salt
	}

	get userId () {
		return this._userId
	}

	get email () {
		return this._email.value
	}

	get password () {
		return this._password
	}

	get salt () {
		return this._salt
	}
}

interface IAuthConstructor extends Base {
	password: string
	salt: string
	userId: string
	email: string
}
