import { type Base, BaseEntity } from '@/entities/base-entity'
import { Category } from './value_objects/category/category'
import { Description } from './value_objects/description/description'
import { Name } from './value_objects/name/name'
import { Price } from './value_objects/price/price'

export class Product extends BaseEntity {
	private _name: Name
	private _description: Description
	private _price: Price
	private _category: Category

	constructor(product: ProductEntity) {
		super({ createdAt: product.createdAt, updatedAt: product.updatedAt, id: product.id })
		this._name = new Name(product.name)
		this._description = new Description(product.description)
		this._price = new Price(product.price)
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

	get category() {
		return this._category.value
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
