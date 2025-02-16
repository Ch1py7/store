import { type Base, BaseEntity } from '@/entities/base-entity'
import { Category } from './value_objects/category/category'
import { Description } from './value_objects/description/description'
import { Name } from './value_objects/name/name'
import { PercentageDiscount } from './value_objects/percentageDiscount/percentage-discount'
import { Price } from './value_objects/price/price'
import { Size } from './value_objects/size/size'
import { SizeToShow } from './value_objects/sizeToShow/sizeToShow'
import { Stock } from './value_objects/stock/stock'

export class Product extends BaseEntity {
	private _name: Name
	private _description: Description
	private _price: Price
	private _size: Size
	private _sizeToShow: SizeToShow
	private _stock: Stock
	private _percentageDiscount: PercentageDiscount
	private _category: Category

	constructor(product: ProductEntity) {
		super({ createdAt: product.createdAt, updatedAt: product.updatedAt, id: product.id })
		this._name = new Name(product.name)
		this._price = new Price(product.price)
		this._description = new Description(product.description)
		this._size = new Size(product.size)
		this._sizeToShow = new SizeToShow(product.sizeToShow)
		this._stock = new Stock(product.stock)
		this._percentageDiscount = product.percentageDiscount
			? new PercentageDiscount(product.percentageDiscount)
			: new PercentageDiscount(0)
		this._category = new Category(product.category)
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

	get sizeToShow() {
		return this._sizeToShow.value
	}

	get stock() {
		return this._stock.value
	}

	get percentageDiscount() {
		return this._percentageDiscount.value
	}

	get category() {
		return this._category.value
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

	changeSize(sizes: number) {
		this._size = new Size([sizes])
	}
}

export interface ProductEntity extends Base {
	name: string
	price: number
	description: string
	size: number[]
	sizeToShow: number
	stock: number
	percentageDiscount: number
	category: number
}
