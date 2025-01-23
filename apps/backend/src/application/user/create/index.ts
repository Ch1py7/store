import { User } from '@/domain/entities/user/user'
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

		const user = new User(
			{
				...dto,
				id: this._cipher.randomUUID(),
				createdAt: Date.now(),
				updatedAt: Date.now(),
				role: 'client',
			},
			this._cipher
		)

		await this._userRepository.save(user)

		return new Response(user)
	}
}
