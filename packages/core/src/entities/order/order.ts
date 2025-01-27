import { type Base, BaseEntity } from '@/entities/base-entity'
import { ID } from '../value_objects/id/id'
import { Products, type ProductWithQuantity } from './value_objects/products/products'
import { Status, type StatusConstructor } from './value_objects/status/status'
import { Total } from './value_objects/total/total'

export class Order extends BaseEntity {
	public _userId: ID
	public _products: Products
	public _total: Total
	public _status: Status

	constructor(order: OrderEntity) {
		super({ createdAt: order.createdAt, updatedAt: order.updatedAt, id: order.id })
		this._userId = new ID(order.userId)
		this._products = new Products(order.products)
		this._total = new Total(order.total, this._products)
		this._status = new Status(order.status)
	}

	get userId(): ID {
		return this._userId
	}

	get products(): Products {
		return this._products
	}

	get total(): Total {
		return this._total
	}

	get status(): Status {
		return this._status
	}

	updateStatus(newStatus: StatusConstructor) {
		this._status = new Status(newStatus)
	}

	addProduct(product: ProductWithQuantity) {
		this._products = this._products.addProduct(product.product, product.quantity)
		this._total = new Total(
			this._total.value + product.product.price.value * product.quantity,
			this._products
		)
	}

	removeProduct(productId: string) {
		this._products = this._products.removeProduct(productId)
		this._total = new Total(this._products.totalPrice, this._products)
	}
}

interface OrderEntity extends Base {
	userId: string
	products: ProductWithQuantity[]
	total: number
	status: StatusConstructor
}
