import { UserParser } from '@store/core'
import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import { CreateProduct } from './application/product/create'
import { DeleteUser } from './application/user/delete'
import { GetUser } from './application/user/get_user'
import { GetUsers } from './application/user/get_users'
import { UpdateUser } from './application/user/update'
import { config } from './infrastructure/config'
import { ProductParser } from './infrastructure/repositories/product/parser/product-parser'
import { ProductRepository } from './infrastructure/repositories/product/product-repository'
import { UserRepository } from './infrastructure/repositories/user/user-repository'
import { supabaseClient } from './infrastructure/supabase/client'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// user use cases
	updateUser: asClass(UpdateUser),
	deleteUser: asClass(DeleteUser),
	getUser: asClass(GetUser),
	getUsers: asClass(GetUsers),

	// product use cases
	createProduct: asClass(CreateProduct),

	// repositories
	userRepository: asClass(UserRepository),
	productRepository: asClass(ProductRepository),

	// supabase client
	supabaseClient: asValue(supabaseClient),

	// parsers
	userParser: asClass(UserParser),
	productParser: asClass(ProductParser),

	// common
	crypto: asValue(crypto),
	config: asValue(config),
})
