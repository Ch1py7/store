import { type Base, BaseEntity } from '@/entities/base-entity'
import { Description } from './value_objects/description/description'
import { Name } from './value_objects/name/name'
import { PercentageDiscount } from './value_objects/percentageDiscount/percentage-discount'
import { Price } from './value_objects/price/price'
import { Size } from './value_objects/size/size'
import { Stock } from './value_objects/stock/stock'

export class Product extends BaseEntity {
	private _name: Name
	private _description: Description
	private _price: Price
	private _size: Size
	private _stock: Stock
	private _percentageDiscount: PercentageDiscount

	constructor(product: ProductEntity) {
		super({ createdAt: product.createdAt, updatedAt: product.updatedAt, id: product.id })
		this._name = new Name(product.name)
		this._price = new Price(product.price)
		this._description = new Description(product.description)
		this._size = new Size(product.size)
		this._stock = new Stock(product.stock)
		this._percentageDiscount = product.percentageDiscount
			? new PercentageDiscount(product.percentageDiscount)
			: new PercentageDiscount(0)
	}

	get name() {
		return this._name.value
	}

	get price() {
		return this._price.value
	}

	get description() {
		return this._description.value
	}

	get size() {
		return this._size.value
	}

	get stock() {
		return this._stock.value
	}

	get percentageDiscount() {
		return this._percentageDiscount.value
	}

	get DiscountedPrice(): Price {
		const discountedValue = this._price.value * (1 - this._percentageDiscount.value / 100)

		return new Price(discountedValue)
	}

	increaseStock(quantity: number) {
		this._stock = this._stock.increase(quantity)
	}

	decreaseStock(quantity: number) {
		this._stock = this._stock.decrease(quantity)
	}
}

export interface ProductEntity extends Base {
	name: string
	price: number
	description: string
	size: number[]
	stock: number
	percentageDiscount: number
}
