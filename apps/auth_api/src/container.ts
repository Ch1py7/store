import { UserParser } from '@store/core'
import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import { AuthParser } from './infrastructure/parsers/AuthParser'
import { UserAuthRepository } from './infrastructure/repository/user-auth-repository'
import { CryptoCipher } from './infrastructure/security/crypto-cypher'
import { supabaseClient } from './infrastructure/supabase/client'
import { RegisterUser } from './application/register'

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
	registerUser: asClass(RegisterUser)
})
