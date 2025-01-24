export interface Cipher {
	randomUUID(): string
	randomString(length: number): string
	hashPassword(password: string): { hashedPassword: string; salt: string }
	verifyPassword(storedHashBase64: string, storedSalt: string, password: string): boolean
}
