import type { DeleteUser } from '@/application/user/delete'
import type { UpdateUser } from '@/application/user/update'
import type { UserRepository } from '@/infrastructure/repositories/user/user-repository'
import type { supabaseClient } from '@/infrastructure/supabase/client'
import type { UserParser } from '@store/core'
import type crypto from 'node:crypto'
import type { config } from '../infrastructure/config/index'

declare global {
	interface Dependencies {
		updateUser: UpdateUser
		deleteUser: DeleteUser
		supabaseClient: typeof supabaseClient
		userRepository: UserRepository
		crypto: typeof crypto
		config: typeof config
		userParser: UserParser
	}
}
