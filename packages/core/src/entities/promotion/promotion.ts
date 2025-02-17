import { type Base, BaseEntity } from '@/entities/base-entity'
import { ID } from '../value_objects/id/id'
import { Timestamps } from '../value_objects/timestamps/timestamps'
import { DiscountPercentage } from './value_objects/discountPercentage/discount-percentage'

export class Promotion extends BaseEntity {
	private _discountPercentage: DiscountPercentage
	private _productId: ID
	private _categoryId: number
	private _startDate: number
	private _endDate: number
	private _isActive: boolean

	constructor(promotion: PromotionEntity) {
		super({ createdAt: promotion.createdAt, updatedAt: promotion.updatedAt, id: promotion.id })
		this._discountPercentage = promotion.discountPercentage
			? new DiscountPercentage(promotion.discountPercentage)
			: new DiscountPercentage(0)
		this._productId = new ID(promotion.productId)
		this._categoryId = promotion.categoryId
		const { createdAt: startDate, updatedAt: endDate } = new Timestamps(
			promotion.startDate,
			promotion.endDate
		)
		this._startDate = startDate
		this._endDate = endDate
		this._isActive = promotion.isActive
	}

	get discountPercentage() {
		return this._discountPercentage.value
	}

	get productId() {
		return this._productId.value
	}

	get categoryId() {
		return this._categoryId
	}

	get startDate() {
		return this._startDate
	}

	get endDate() {
		return this._endDate
	}

	get isActive() {
		return this._isActive
	}

	public updatediscountPercentage(percentage: number) {
		this._discountPercentage = new DiscountPercentage(percentage)
		this.setUpdatedAt()
		return this
	}

	public updateProductId(productId: string) {
		this._productId = new ID(productId)
		this.setUpdatedAt()
		return this
	}

	public updateCategoryId(categoryId: number) {
		this._categoryId = categoryId
		this.setUpdatedAt()
		return this
	}

	public updateStartDate(newDate: number) {
		const { createdAt: startDate } = new Timestamps(newDate, this._endDate)
		this._startDate = startDate
		this.setUpdatedAt()
		return this
	}

	public updateEndDate(newDate: number) {
		const { updatedAt: endDate } = new Timestamps(this._startDate, newDate)
		this._endDate = endDate
		this.setUpdatedAt()
		return this
	}

	public handleActive() {
		this._isActive = !this._isActive
		this.setUpdatedAt()
		return this
	}

	private setUpdatedAt() {
		this.updatedAt = Date.now()
	}
}

export interface PromotionEntity extends Base {
	discountPercentage: number
	productId: string
	categoryId: number
	startDate: number
	endDate: number
	isActive: boolean
}
