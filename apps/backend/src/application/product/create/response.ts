import type { Product } from '@store/core'

export class CreateResponse {
	public name: string
	public description: string
	public price: number
	constructor({ name, description, price }: Product) {
		this.name = name
		this.description = description
		this.price = price
	}
}
