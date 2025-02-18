import type { Attribute as AttributeDomain } from '@store/core'

export interface IAttributeRepository {
	save(Attribute: AttributeDomain): Promise<void>
	update(Attribute: AttributeDomain): Promise<void>
}
