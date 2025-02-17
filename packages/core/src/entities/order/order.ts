import { type Base, BaseEntity } from '@/entities/base-entity'
import { ID } from '../value_objects/id/id'
import { type ProductOrder, Products } from './value_objects/products/products'
import { Status } from './value_objects/status/status'
import { Total } from './value_objects/total/total'

export class Order extends BaseEntity {
	public _userId: ID
	public _products: Products
	public _status: Status
	public _total: Total

	constructor(order: OrderEntity) {
		super({ createdAt: order.createdAt, updatedAt: order.updatedAt, id: order.id })
		this._userId = new ID(order.userId)
		this._products = new Products(order.products)
		this._status = new Status(order.status)
		this._total = this.setTotal(order.products)
	}

	get userId() {
		return this._userId.value
	}

	get products() {
		return this._products.products
	}

	get status() {
		return this._status.value
	}

	get total() {
		return this._total.value
	}

	public updateStatus(newStatus: number) {
		this._status = new Status(newStatus)
	}

	private setTotal(products: ProductOrder[]) {
		const total = products.reduce((prev, { price, quantity }) => {
			return prev + price * quantity
		}, 0)

		return new Total(total)
	}
}

interface OrderEntity extends Base {
	userId: string
	status: number
	products: ProductOrder[]
}
