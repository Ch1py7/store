import { BaseEntity, type Base } from '@/entities/base-entity'
import { ID } from '../value_objects/id/id'
import { Products, type ProductCart } from './value_objects/products/products'
import { Total } from './value_objects/total/total'

export class Cart extends BaseEntity {
	private _userId: ID
	public _products: Products
	public _total: Total

	constructor(cart: CartEntity) {
		super({ createdAt: cart.createdAt, updatedAt: cart.updatedAt, id: cart.id })
		this._userId = new ID(cart.userId)
		this._products = new Products(cart.products)
		this._total = this.setTotal(cart.products)
	}

	get userId() {
		return this._userId.value
	}

	get products() {
		return this._products.products
	}

	get total() {
		return this._total.value
	}

	public updateProducts(products: ProductCart[]) {
		this._products = new Products(products)
		this._total = this.setTotal(products)
		this.setUpdatedAt()
		return this
	}

	private setUpdatedAt() {
		this.updatedAt = Date.now()
	}

	private setTotal(products: ProductCart[]) {
		const total = products.reduce((prev, { price, quantity }) => {
			return prev + price * quantity
		}, 0)

		return new Total(total)
	}
}

interface CartEntity extends Base {
	userId: string
	products: ProductCart[]
}
