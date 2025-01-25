import type { UpdateCommand } from './command'

export class UpdateUser {
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

	public async execute({ id, firstName, lastName }: UpdateCommand) {
		const user = await this._userRepository.findById(id)

		user.updateFirstName(firstName)
		user.updateLastName(lastName)

		await this._userRepository.updateUser(user)

		// await this._userRepository.save({
		//   id: user.id,
		//   firstName: user.firstName,
		//   lastName: user.lastName,
		//   email: user.email,
		//   password: user.password!,
		//   salt,
		//   isVerified: user.isVerified,
		//   updatedAt: BigInt(user.updatedAt),
		//   createdAt: BigInt(user.createdAt),
		//   role: user.role,
		//   verificationCode: this._cipher.randomString(8),
		//   tempPassword: '',
		// })

		// return new Response(user)
	}
}
