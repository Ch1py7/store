import { type Base, BaseEntity } from '@/entities/base-entity'
import { ID } from '../value_objects/id/id'
import { Stock } from './value_objects/stock/stock'

export class Inventory extends BaseEntity {
	private _productId: ID
	private _stock: Stock

	constructor(inventory: InventoryEntity) {
		super({ createdAt: inventory.createdAt, updatedAt: inventory.updatedAt, id: inventory.id })
		this._productId = new ID(inventory.productId)
		this._stock = new Stock(inventory.stock)
	}

	get productId() {
		return this._productId.value
	}

	get stock() {
		return this._stock.value
	}

	public increaseStock(quantity: number) {
		this.setUpdatedAt()
		this._stock = this._stock.increase(quantity)
	}

	public decreaseStock(quantity: number) {
		this.setUpdatedAt()
		this._stock = this._stock.decrease(quantity)
	}

	private setUpdatedAt() {
		this.updatedAt = Date.now()
	}
}

export interface InventoryEntity extends Base {
	productId: string
	stock: number
}
