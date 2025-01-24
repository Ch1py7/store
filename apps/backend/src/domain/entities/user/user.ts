import { type Base, BaseEntity } from '@/domain/entities/base-entity'
import { InvalidUserError } from './errors'
import { Email } from './value_objects/email/email'
import { FirstName } from './value_objects/firstname/firstname'
import { LastName } from './value_objects/lastname/lastname'
import { Role } from './value_objects/role/role'
import { TemporaryPassword } from './value_objects/temporary_password/temporary_password'
import { VerificationCode } from './value_objects/verification_code/verification_code'

export class User extends BaseEntity {
	private _firstName: FirstName
	private _lastName: LastName
	private _role: Role
	private _email: Email
	private _isVerified: boolean
	private _hashedPassword?: string
	private _temporaryPassword?: TemporaryPassword
	private _verificationCode?: VerificationCode

	constructor(user: UserEntity) {
		super({ createdAt: user.createdAt, updatedAt: user.updatedAt, id: user.id })
		this._firstName = new FirstName(user.firstName)
		this._lastName = new LastName(user.lastName)
		this._role = new Role(user.role)
		this._email = new Email(user.email)
		this._isVerified = false

		if (user.hashedPassword) {
			this._hashedPassword = user.hashedPassword
		}

		if (user.tempPassword) {
			this._temporaryPassword = new TemporaryPassword(user.tempPassword)
		}
	}

	get firstName() {
		return this._firstName.value
	}

	get lastName() {
		return this._lastName.value
	}

	get password() {
		return this._hashedPassword
	}

	get role() {
		return this._role.value
	}

	get email() {
		return this._email.value
	}

	get isVerified() {
		return this._isVerified
	}

	get verificationCode(): VerificationCode | undefined {
		return this._verificationCode
	}

	get temporaryPassword(): TemporaryPassword | undefined {
		return this._temporaryPassword
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

	public changePassword(newPassword: string) {
		this.setPassword(newPassword)
	}

	public setPassword(newPassword: string) {
		this._hashedPassword = newPassword
		this._temporaryPassword = undefined
	}

	public generateTemporaryPassword() {
		const tempPassword = Math.random().toString(36).slice(-8)
		this._temporaryPassword = new TemporaryPassword(tempPassword)
	}

	public validateTemporaryPassword(password: string) {
		return this._temporaryPassword?.value === password && !this._temporaryPassword?.isExpired()
	}

	public hasValidTemporaryPassword(currentTimestamp: number = Date.now()) {
		return (
			this._temporaryPassword !== undefined && !this._temporaryPassword.isExpired(currentTimestamp)
		)
	}

	public validateVerificationCode(code: string) {
		return this._verificationCode?.isValid(code) ?? false
	}

	public generateVerificationCode() {
		const code = Math.floor(100000 + Math.random() * 900000).toString()
		this._verificationCode = new VerificationCode(code)
	}
}

interface UserEntity extends Base {
	firstName: string
	lastName: string
	role: 'admin' | 'client'
	email: string
	codeVerification?: string
	hashedPassword?: string
	tempPassword?: string
}
