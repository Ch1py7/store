import { type Base, BaseEntity } from '@/domain/entities/base-entity'
import type { Cipher } from '@/domain/services/cipher'
import { InvalidUserError } from './errors'
import { Email } from './value_objects/email/email'
import { FirstName } from './value_objects/firstname/firstname'
import { LastName } from './value_objects/lastname/lastname'
import { Password } from './value_objects/password/password'
import { Role } from './value_objects/role/role'
import { TemporaryPassword } from './value_objects/temporary_password/temporary_password'
import { VerificationCode } from './value_objects/verification_code/verification_code'

export class User extends BaseEntity {
	private _firstName: FirstName
	private _lastName: LastName
	private _role: Role
	private _email: Email
	private _isVerified: boolean
	private _password?: Password
	private _temporaryPassword?: TemporaryPassword
	private _verificationCode?: VerificationCode
	private cipher: Cipher

	constructor(user: UserEntity, cipher: Cipher) {
		super({ createdAt: user.createdAt, updatedAt: user.updatedAt, id: user.id })
		this._firstName = new FirstName(user.firstName)
		this._lastName = new LastName(user.lastName)
		this._role = new Role(user.role)
		this._email = new Email(user.email)
		this._isVerified = false
		this.cipher = cipher

		if (user.password) {
			this._password = new Password(user.password, cipher)
		}

		if (user.tempPassword) {
			this._temporaryPassword = new TemporaryPassword(user.tempPassword)
		}
	}

	get firstName(): FirstName {
		return this._firstName
	}

	get lastName(): LastName {
		return this._lastName
	}

	get password(): Password | undefined {
		return this._password
	}

	get role(): Role {
		return this._role
	}

	get email(): Email {
		return this._email
	}

	get isVerified(): boolean {
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
		this._password = new Password(newPassword, this.cipher)
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
	password?: string
	tempPassword?: string
}
