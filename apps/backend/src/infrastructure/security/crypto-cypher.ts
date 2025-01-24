import type { Cipher } from '@/domain/services/cipher'
import { FailedDecryptError } from '../errors/FailedDecryptError'

export class CryptoCipher implements Cipher {
	private readonly _ENCRYPT_ALGORITHM = 'aes-256-ctr'
	private readonly _BASE36_ENCODING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	private readonly _crypto: Dependencies['crypto']
	private readonly _privateKey: Constructor['privateKey']

	constructor({ config, crypto }: Pick<Dependencies, 'config' | 'crypto'>) {
		this._crypto = crypto
		this._privateKey = this._normalizePrivateKey(config.privateKey)
	}

	private _normalizePrivateKey(privateKey: string) {
		return this._crypto.createHash('sha256').update(privateKey).digest('base64')
	}

	/**
	 * Encrypt the provided value using AES-256-CTR algorithm.
	 * @returns An object with the encrypted value (content property) and the initialization vector (iv property).
	 * @see Cipher#decrypt
	 */
	public encrypt(value: string): ICipherEncryption {
		try {
			const key = Buffer.from(this._privateKey, 'base64')
			const iv = this._crypto.randomBytes(16)
			const cipher = this._crypto.createCipheriv(this._ENCRYPT_ALGORITHM, key, iv)
			const encrypted = Buffer.concat([cipher.update(value), cipher.final()])
			return {
				content: encrypted.toString('hex'),
				iv: iv.toString('hex'),
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	/**
	 * Decrypt the provided encryption pair (content and iv) using AES-256-CTR algorithm.
	 * @returns The decrypted value.
	 * @see Cipher#encrypt
	 */
	public decrypt(encryption: ICipherEncryption) {
		try {
			const key = Buffer.from(this._privateKey, 'base64')
			const iv = Buffer.from(encryption.iv, 'hex')
			const decipher = this._crypto.createDecipheriv('aes-256-ctr', key, iv)
			const decrypted = Buffer.concat([
				decipher.update(encryption.content, 'hex'),
				decipher.final(),
			])
			return decrypted.toString()
		} catch (error) {
			throw new FailedDecryptError('Error decrypting content')
		}
	}

	/**
	 * Generate a MD5 hash from the provided value.
	 */
	public md5(value: string): string {
		return this._crypto.createHash('md5').update(value).digest('hex')
	}

	/**
	 * Generate a random v4 UUID.
	 */
	public randomUUID(): string {
		return this._crypto.randomUUID()
	}

	/**
	 * Generate a cryptographic random string of the provided length with a base36 encoding that uses the characters `[0-9]` and `[A-Z]` in uppercase.
	 */
	public randomString(length: number): string {
		return Array.from(this._crypto.randomBytes(length))
			.map((byte) => this._BASE36_ENCODING[byte % this._BASE36_ENCODING.length])
			.join('')
	}

	public hashPassword(password: string) {
		const salt = this._crypto.randomBytes(64).toString('hex')
		const hashedPassword = this._crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('base64')

		return { hashedPassword, salt }
	}

	public verifyPassword(storedHashBase64: string, storedSalt: string, password: string) {
		const hash = this._crypto.pbkdf2Sync(password, storedSalt, 10000, 64, 'sha256').toString('base64')
	
		return storedHashBase64 === hash;
	}
	
}

interface Constructor {
	privateKey: string
}

interface ICipherEncryption {
	content: string
	iv: string
}
