import type { IUserAuthRepository } from '@/domain/repositories/user-auth-repository'
import type { UserAuth } from '@/domain/user_auth/auth'

export class UserAuthRepository implements IUserAuthRepository {
	private _userParser: Dependencies['userParser']
	private _authParser: Dependencies['authParser']
	private _supabaseClient: Dependencies['supabaseClient']

	constructor({
		userParser,
		authParser,
		supabaseClient,
	}: Pick<Dependencies, 'cipher' | 'userParser' | 'supabaseClient' | 'authParser'>) {
		this._userParser = userParser
		this._authParser = authParser
		this._supabaseClient = supabaseClient
	}

	async save(userAuth: UserAuth) {
		const { auth, user } = userAuth

		const authData = this._authParser.toDbModel(auth)
		const userData = this._userParser.toDbModel(user)

		const { error } = await this._supabaseClient.rpc('insert_user_auth', {
			user_table_data: userData,
			auth_table_data: authData,
		})

		if (error) {
			throw error
		}
	}

	async getSession(userId: string) {
		const { data, error } = await this._supabaseClient
			.from('User')
			.select('*')
			.eq('userId', userId)
			.single()

		if (error) throw error

		return this._userParser.toDomain(data)
	}

	public async findByEmail(email: string) {
		const { data, error } = await this._supabaseClient
			.from('Auth')
			.select('*')
			.eq('email', email)
			.single()

		if (error) throw error

		return this._authParser.toDomain(data)
	}
}
