import { User as UserDomain } from '@/domain/entities/user/user'
import type { User as UserDb } from '@prisma/client'

export class UserParser {
	toDomain(dbModel: UserDb): UserDomain {
		return new UserDomain({
			id: dbModel.id,
			firstName: dbModel.firstName,
			lastName: dbModel.lastName,
			email: dbModel.email,
			updatedAt: Number(dbModel.updatedAt),
			createdAt: Number(dbModel.createdAt),
			role: dbModel.role,
			hashedPassword: dbModel.password,
			codeVerification: dbModel.verificationCode,
			tempPassword: dbModel.tempPassword,
		})
	}

	toDbModel(domainModel: UserDomain, salt = ''): UserDb {
		return {
			id: domainModel.id,
			firstName: domainModel.firstName,
			lastName: domainModel.lastName,
			email: domainModel.email,
			password: domainModel.password!,
			salt,
			isVerified: domainModel.isVerified,
			createdAt: domainModel.createdAt.toString(),
			updatedAt: domainModel.updatedAt.toString(),
			role: domainModel.role,
			verificationCode: domainModel.verificationCode ?? '',
			tempPassword: domainModel.temporaryPassword ?? '',
			isDeleted: domainModel.isDeleted,
		}
	}
}
