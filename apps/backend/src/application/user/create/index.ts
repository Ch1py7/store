import { User } from '@/domain/entities/user/user'
import { Password } from '@/domain/entities/user/value_objects/password/password'
import type { Command } from './command'
import { Response } from './response'

export class CreateUser {
	private _userRepository: Dependencies['userRepository']
	private _userService: Dependencies['userService']
	private _cipher: Dependencies['cipher']

	constructor({
		userRepository,
		cipher,
		userService,
	}: Pick<Dependencies, 'userRepository' | 'cipher' | 'userService'>) {
		this._userRepository = userRepository
		this._userService = userService
		this._cipher = cipher
	}

	public async execute(dto: Command) {
		await this._userService.ensureEmailIsAvailable(dto.email)

		const { value: password } = new Password(dto.password)

		const { hashedPassword, salt } = this._cipher.hashPassword(password)

		const user = new User({
			...dto,
			hashedPassword: hashedPassword,
			id: this._cipher.randomUUID(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})

		await this._userRepository.save({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: user.password!,
			salt,
			isVerified: user.isVerified,
			updatedAt: BigInt(user.updatedAt),
			createdAt: BigInt(user.createdAt),
			role: user.role,
			verificationCode: this._cipher.randomString(8),
			tempPassword: '',
		})

		return new Response(user)
	}
}
