import type { User as UserDomain } from '@/domain/entities/user/user'
import type { IUserRepository } from '@/domain/repositories/user-repository'
import { UserNotFoundError } from './errors'

export class UserRepository implements IUserRepository {
	private _prismaClient: Dependencies['prismaClient']
	private _userParser: Dependencies['userParser']

	constructor({ prismaClient, userParser }: Pick<Dependencies, 'prismaClient' | 'userParser'>) {
		this._prismaClient = prismaClient
		this._userParser = userParser
	}

	public async createUser(user: UserDomain, salt: string) {
		const dbModel = this._userParser.toDbModel(user, salt)

		return await this._prismaClient.user.create({
			data: dbModel,
		})
	}

	public async updateUser(user: UserDomain) {
		return await this._prismaClient.user.update({
			data: {
				...user,
			},
			where: {
				id: user.id,
			},
		})
	}

	public async deleteUser(user: UserDomain) {
		const dbModel = this._userParser.toDbModel(user)

		return await this._prismaClient.user.update({
			data: {
				...dbModel,
			},
			where: {
				id: dbModel.id,
			},
		})
	}

	public async findByEmail(email: string) {
		const dbModel = await this._prismaClient.user.findUnique({
			where: { email },
		})

		return dbModel ? this._userParser.toDomain(dbModel) : null
	}

	public async findById(id: string) {
		const dbModel = await this._prismaClient.user.findUnique({
			where: { id },
		})

		if (!dbModel) {
			throw new UserNotFoundError('User not found')
		}

		const domainModel = this._userParser.toDomain(dbModel)

		return domainModel
	}

	public async findAll(): Promise<UserDomain[]> {
		const dbModel = await this._prismaClient.user.findMany()

		const domainModel = dbModel.map((db) => this._userParser.toDomain(db))

		return domainModel
	}
}
