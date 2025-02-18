import { ID } from '../value_objects/id/id'
import { AttributeName } from './value_objects/attribute_name/attribute-name'

export class Attribute {
	private _id: ID
	private _productId: ID
	private _attributeName: AttributeName
	private _attributeValue: string

	constructor({ attributeName, attributeValue, id, productId, category }: AttributeEntity) {
		this._id = new ID(id)
		this._productId = new ID(productId)
		this._attributeName = new AttributeName(attributeName, category)
		this._attributeValue = attributeValue
	}

	get id() {
		return this._id.value
	}

	get productId() {
		return this._productId.value
	}

	get attributeName() {
		return this._attributeName.value
	}

	get attributeValue() {
		return this._attributeValue
	}
}

export interface AttributeEntity {
	id: string
	productId: string
	attributeName: string
	attributeValue: string
	category: number
}
