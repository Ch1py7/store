export interface Cipher {
	encrypt(value: string): { content: string; iv: string }
	decrypt(encryption: { content: string; iv: string }): string
	randomUUID(): string
	randomUUID(value: string): string
	randomString(length: number): string
	hashPassword(password: string): { hashedPassword: string; salt: string }
	verifyPassword(storedHashBase64: string, storedSalt: string, password: string): boolean
}
