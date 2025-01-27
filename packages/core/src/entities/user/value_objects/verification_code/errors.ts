export class InvalidVerificationCodeError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidVerificationCodeError'
	}
}
