import type { DeleteCommand } from './command'
import { DeleteResponse } from './response'

export class DeleteUser {
	private _userRepository: Dependencies['userRepository']

	constructor({ userRepository }: Pick<Dependencies, 'userRepository'>) {
		this._userRepository = userRepository
	}

	public async execute({ id }: DeleteCommand) {
		const user = await this._userRepository.findById(id)

		user.setDeleted()

		await this._userRepository.deleteUser(user)

		return new DeleteResponse(user)
	}
}
