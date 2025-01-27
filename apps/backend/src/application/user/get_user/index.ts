import type { GetUserCommand } from './command'
import { GetUserResponse } from './response'

export class GetUser {
	private _userRepository: Dependencies['userRepository']

	constructor({ userRepository }: Pick<Dependencies, 'userRepository'>) {
		this._userRepository = userRepository
	}

	public async execute({ id }: GetUserCommand) {
		const user = await this._userRepository.findById(id)

		user.setDeleted()

		// await this._userRepository.deleteUser(user)

		return new GetUserResponse(user)
	}
}
