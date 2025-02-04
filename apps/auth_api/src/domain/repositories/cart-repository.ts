import type { Cart as CartDomain } from '@store/core'

export interface ICartRepository {
	assertCartExists(userId: string): Promise<boolean>
}
