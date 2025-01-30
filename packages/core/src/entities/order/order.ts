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

	get userId() {
		return this._userId.value
	}

	get products() {
		return this._products.products
	}

	get totalPrice() {
		return this._products.totalPrice
	}

	get total() {
		return this._total.value
	}

	get status() {
		return this._status.value
	}

	updateStatus(newStatus: StatusConstructor) {
		this._status = new Status(newStatus)
	}
}

interface OrderEntity extends Base {
	userId: string
	products: ProductWithQuantity[]
	total: number
	status: StatusConstructor
}
