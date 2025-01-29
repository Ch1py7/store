import { UserParser } from '@store/core'
import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import { DeleteUser } from './application/user/delete'
import { UpdateUser } from './application/user/update'
import { config } from './infrastructure/config'
import { UserRepository } from './infrastructure/repositories/user/user-repository'
import { supabaseClient } from './infrastructure/supabase/client'
import { GetUser } from './application/user/get_user'
import { GetUsers } from './application/user/get_users'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	updateUser: asClass(UpdateUser),
	deleteUser: asClass(DeleteUser),
	getUser: asClass(GetUser),
	getUsers: asClass(GetUsers),
	supabaseClient: asValue(supabaseClient),
	crypto: asValue(crypto),
	config: asValue(config),
	userRepository: asClass(UserRepository),
	userParser: asClass(UserParser),
})
