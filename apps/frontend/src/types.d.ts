// Product creation interfaces

interface CommonAttributes {
	material: string
	dimensions: string
	weight: string
	brand: string
	capacity: string
	features: string
}

interface ClothingInputs extends CommonAttributes {
	size: string
	color: string
	colorMap: string
	gender: string
	season: string
	style: string
	material: string
}

interface TechInputs extends CommonAttributes {
	model: string
	processor: string
	ram: string
	storage: string
	display: string
	batteryType: string
	batteryPower: string
	batteryLife: string
	connectivity: string
	modelName: string
	modelYear: string
	builtInMedia: string
	manufacturer: string
	serie: string
	wirelessProvider: string
	cellularTechnology: string
	connectivityTechnology: string
}

interface BooksInputs extends CommonAttributes {
	publisher: string
	language: string
	cover: string
	pages: string
}

interface GeneralInputs<T extends AttributeKey = AttributeKey> {
	attributes: T extends 'CLOTHING'
		? Partial<ClothingInputs>
		: T extends 'TECH'
			? Partial<TechInputs>
			: T extends 'BOOKS'
				? Partial<BooksInputs>
				: never

	name: string
	description: string
	price: number
	stock: number
	category: number
}

type AttributeKey = 'CLOTHING' | 'TECH' | 'BOOKS'

type Attributes = ClothingInputs | TechInputs

// Payment flow interfaces

interface PaymentInputs {
	cardNumber: string
	expDate: string
	cvv: string
}

interface ShippingInputs {
	firstName: string
	lastName: string
	address: string
	city: string
	cp: string
}

type CheckoutInputs = PaymentInputs & ShippingInputs
