import { UserParser } from '@store/core'
import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import { CreateSession } from './application/create_session'
import { LoginUser } from './application/login'
import { RegisterUser } from './application/register'
import { config } from './infrastructure/config'
import { AuthParser } from './infrastructure/repository/auth-parser'
import { UserAuthRepository } from './infrastructure/repository/user-auth-repository'
import { CryptoCipher } from './infrastructure/security/crypto-cypher'
import { supabaseClient } from './infrastructure/supabase/client'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	crypto: asValue(crypto),
	cipher: asClass(CryptoCipher),
	supabaseClient: asValue(supabaseClient),
	userAuthRepository: asClass(UserAuthRepository),
	userParser: asClass(UserParser),
	authParser: asClass(AuthParser),
	config: asValue(config),

	// Use Cases
	registerUser: asClass(RegisterUser),
	loginUser: asClass(LoginUser),
	createSession: asClass(CreateSession),
})
