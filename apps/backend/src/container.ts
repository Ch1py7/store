import { UserParser } from '@store/core'
import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import { DeleteUser } from './application/user/delete'
import { UpdateUser } from './application/user/update'
import { config } from './infrastructure/config'
import { UserRepository } from './infrastructure/repositories/user/userRepository'
import { supabaseClient } from './infrastructure/supabase/client'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	updateUser: asClass(UpdateUser),
	deleteUser: asClass(DeleteUser),
	supabaseClient: asValue(supabaseClient),
	crypto: asValue(crypto),
	config: asValue(config),
	userRepository: asClass(UserRepository),
	userParser: asClass(UserParser),
})
