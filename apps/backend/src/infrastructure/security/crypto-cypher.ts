import type { Cipher } from '@/domain/services/cipher'

export class CryptoCipher implements Cipher {
	private readonly _BASE36_ENCODING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	private readonly _crypto: Dependencies['crypto']

	constructor({ crypto }: Pick<Dependencies, 'crypto'>) {
		this._crypto = crypto
	}

	public randomUUID(): string {
		return this._crypto.randomUUID()
	}

	public hashPassword(password: string) {
		const salt = this._crypto.randomBytes(64).toString('hex')
		const hashedPassword = this._crypto
			.pbkdf2Sync(password, salt, 10000, 64, 'sha256')
			.toString('base64')

		return { hashedPassword, salt }
	}

	public verifyPassword(storedHashBase64: string, storedSalt: string, password: string) {
		const hash = this._crypto
			.pbkdf2Sync(password, storedSalt, 10000, 64, 'sha256')
			.toString('base64')

		return storedHashBase64 === hash
	}

	public randomString(length: number): string {
		return Array.from(this._crypto.randomBytes(length))
			.map((byte) => this._BASE36_ENCODING[byte % this._BASE36_ENCODING.length])
			.join('')
	}
}
