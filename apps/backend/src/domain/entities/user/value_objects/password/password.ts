import type { Cipher } from '@/domain/services/cipher'
import { InvalidPasswordError } from './errors'

export class Password {
	public readonly value: string
	private readonly _cipher: Cipher
	private readonly _iv: string

	constructor(value: string, cipher: Cipher) {
		this._cipher = cipher
		this._assertIsValidPassword(value)

		const { content, iv } = this._cipher.encrypt(value)

		this.value = content
		this._iv = iv
	}

	private _assertIsValidPassword(value: string) {
		if (!value || value.length < 8 || value.length > 25) {
			throw new InvalidPasswordError(
				'The password is required and must be between 8 and 25 characters.'
			)
		}
	}

	public decrypt() {
		return this._cipher.decrypt({ content: this.value, iv: this._iv })
	}
}
