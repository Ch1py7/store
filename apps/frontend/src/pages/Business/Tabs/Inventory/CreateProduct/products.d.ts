interface ClothingInputs {
	size: string
	color: string
	colorMap: string
	gender: string
	season: string
	style: string
	material: string
}

interface TechInputs {
	model: string
	processor: string
	ram: string
	storage: string
	display: string
	battery: string
	connectivity: string
}

interface GeneralInputs<T extends AttributeKey = AttributeKey> {
	attributes: T extends 'CLOTHING'
		? Partial<ClothingInputs>
		: T extends 'TECH'
			? Partial<TechInputs>
			: never
	name: string
	description: string
	price: number
	stock: number
	category: number
}

type AttributeKey = 'CLOTHING' | 'TECH'

type Attributes = ClothingInputs | TechInputs

