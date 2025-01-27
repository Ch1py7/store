import { type Base, BaseEntity } from '@/entities/base-entity'
import { InvalidUserError } from './errors'
import { FirstName } from './value_objects/firstname/firstname'
import { LastName } from './value_objects/lastname/lastname'
import { Role } from './value_objects/role/role'
import { VerificationCode } from './value_objects/verification_code/verification_code'
import { Email } from './value_objects/email/email'

export class User extends BaseEntity {
	private _firstName: FirstName
	private _lastName: LastName
	private _role: Role
	private _email: Email
	private _isVerified?: boolean
	private _isDeleted?: boolean
	private _verificationCode?: VerificationCode

	constructor(user: IUserConstructor) {
		super({ createdAt: user.createdAt, updatedAt: user.updatedAt, id: user.id })
		this._firstName = new FirstName(user.firstName)
		this._lastName = new LastName(user.lastName)
		this._role = new Role(user.role)
		this._email = new Email(user.email)
		this._isVerified = user.isVerified
		this._isDeleted = user.isDeleted
	}

	get firstName() {
		return this._firstName.value
	}

	get lastName() {
		return this._lastName.value
	}

	get role() {
		return this._role.value
	}

	get isVerified() {
		return this._isVerified
	}

	get email() {
		return this._email.value
	}

	get verificationCode() {
		return this._verificationCode?.value
	}

	get isDeleted() {
		return this._isDeleted
	}

	public verifyAccount(code: string) {
		if (!this._verificationCode) {
			throw new InvalidUserError('Verification code has not been generated.')
		}
		if (this._verificationCode.isValid(code)) {
			this._isVerified = true
		} else {
			throw new InvalidUserError('Invalid verification code.')
		}
	}

	public updateFirstName(newFirstName: string) {
		this._firstName = new FirstName(newFirstName)
		this.setUpdatedAt()
		return this
	}

	public updateLastName(newLastName: string) {
		this._lastName = new LastName(newLastName)
		this.setUpdatedAt()
		return this
	}

	public validateVerificationCode(code: string) {
		return this._verificationCode?.isValid(code) ?? false
	}

	public generateVerificationCode() {
		const code = Math.floor(100000 + Math.random() * 900000).toString()
		this._verificationCode = new VerificationCode(code)
	}

	public setDeleted() {
		this._isDeleted = true
		this.setUpdatedAt()
	}

	private setUpdatedAt() {
		this.updatedAt = Date.now()
	}
}

interface IUserConstructor extends Base {
	firstName: string
	lastName: string
	email: string
	role: number
	isVerified?: boolean
	isDeleted?: boolean
	verificationCode?: string
}
