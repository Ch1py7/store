import type { UpdateCommand } from './command'

export class UpdateUser {
	private _userRepository: Dependencies['userRepository']

	constructor({ userRepository }: Pick<Dependencies, 'userRepository'>) {
		this._userRepository = userRepository
	}

	public async execute({ id, firstName, lastName }: UpdateCommand) {
		const user = await this._userRepository.findById(id)

		user.updateFirstName(firstName).updateLastName(lastName)

		await this._userRepository.updateUser(user)

		// TODO: configure to return updated jwt
	}
}
