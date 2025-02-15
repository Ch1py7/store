import type { IUserRepository } from '@/domain/repositories/user-repository'
import type { User as UserDomain } from '@store/core'
import { UserNotFoundError } from './errors'

export class UserRepository implements IUserRepository {
	private _supabaseClient: Dependencies['supabaseClient']
	private _userParser: Dependencies['userParser']

	constructor({ supabaseClient, userParser }: Pick<Dependencies, 'supabaseClient' | 'userParser'>) {
		this._supabaseClient = supabaseClient
		this._userParser = userParser
	}

	public async updateUser(user: UserDomain) {
		const dbModel = this._userParser.toDbModel(user)

		const { error } = await this._supabaseClient
			.from('User')
			.update(dbModel)
			.eq('id', dbModel.id)
			.eq('is_deleted', false)
			.select('id')
			.single()

		if (error) throw error
	}

	public async deleteUser(user: UserDomain) {
		const dbModel = this._userParser.toDbModel(user)

		const { data, error } = await this._supabaseClient
			.from('User')
			.update(dbModel)
			.eq('id', dbModel.id)
			.eq('is_deleted', false)
			.select('id')
			.single()

		if (!data) throw new UserNotFoundError('User not found.')

		if (error) throw error
	}

	public async findById(id: string) {
		const { data, error } = await this._supabaseClient
			.from('User')
			.select('*')
			.eq('id', id)
			.single()

		if (error) throw error

		return this._userParser.toDomain(data)
	}

	public async findAll(): Promise<UserDomain[]> {
		const { data, error } = await this._supabaseClient.from('User').select('*')

		if (error) throw error

		const domainModel = data.map((db) => this._userParser.toDomain(db))

		return domainModel
	}
}
