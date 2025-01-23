import { EmailAlreadyExistsError } from '@/domain/entities/user/value_objects/email/errors'

export class UserDomainService {
	private _userRepository: Dependencies['userRepository']

	constructor({ userRepository }: Pick<Dependencies, 'userRepository'>) {
		this._userRepository = userRepository
	}

	public async ensureEmailIsAvailable(email: string): Promise<void> {
		const user = await this._userRepository.findByEmail(email)
		if (user) {
			throw new EmailAlreadyExistsError('The email is already in use.')
		}
	}
}
