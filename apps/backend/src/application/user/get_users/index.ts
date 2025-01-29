import { GetUsersResponse } from './response'

export class GetUsers {
	private _userRepository: Dependencies['userRepository']

	constructor({ userRepository }: Pick<Dependencies, 'userRepository'>) {
		this._userRepository = userRepository
	}

	public async execute() {
		const user = await this._userRepository.findAll()

		return new GetUsersResponse(user)
	}
}
