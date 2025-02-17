export class Products {
	private readonly _products: ProductCart[]

	constructor(products: ProductCart[]) {
		this._products = products
	}

	get products(): ProductCart[] {
		return this._products
	}
}

export interface ProductCart {
	id: string
	name: string
	quantity: number
	price: number
}
