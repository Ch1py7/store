import { User } from '@/domain/entities/user/user'
import { Password } from '@/domain/entities/user/value_objects/password/password'
import type { CreateCommand } from './command'
import { CreateResponse } from './response'

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

	public async execute(dto: CreateCommand) {
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

		await this._userRepository.createUser(user, salt)

		return new CreateResponse(user)
	}
}
