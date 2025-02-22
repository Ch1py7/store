import { InvalidAttributeError } from './errors'

enum ProductsCategories {
	Clothing = 1,
	Technology = 2,
	Reading = 3,
	HomeAndKitchen = 4,
	HealthAndBeauty = 5,
	ToysAndGames = 6,
}

const attributesConfig: Record<string, string[]> = {
	general: ['material', 'dimensions', 'weight', 'brand', 'capacity', 'features'],
	[ProductsCategories.Clothing]: ['size', 'color', 'gender', 'season', 'style', 'type', 'colorMap'],
	[ProductsCategories.Technology]: [
		'model',
		'processor',
		'ram',
		'storage',
		'display',
		'batteryType',
		'batteryPower',
		'batteryLife',
		'connectivity',
		'modelName',
		'builtInMedia',
		'manufacturer',
		'serie',
		'wirelessProvider',
		'modelYear',
		'cellularTechnology',
		'connectivityTechnology',
	],
	[ProductsCategories.Reading]: ['publisher', 'language', 'cover', 'pages'],
	[ProductsCategories.HomeAndKitchen]: [
		'pages',
		'author',
		'publisher',
		'isbn',
		'language',
		'format',
		'genre',
		'publicationYear',
	],
	[ProductsCategories.HealthAndBeauty]: [
		'ingredients',
		'skinType',
		'hairType',
		'volume',
		'expDate',
		'allergenInfo',
		'certification',
		'applicationMethod',
	],
	[ProductsCategories.ToysAndGames]: ['recommendedAge', 'reqBattery', 'numOfPlayers', 'gameType'],
}

export class AttributeName {
	public readonly value: string

	constructor(value: string, category: number) {
		this._validateAttributes(value, category)
		this.value = value
	}

	private _validateAttributes(name: string, category: ProductsCategories) {
		if (!attributesConfig[category]) {
			throw new InvalidAttributeError(`Invalid category: ${category}`)
		}

		const allowedAttributes = [...attributesConfig.general, ...attributesConfig[category]]

		if (!allowedAttributes.includes(name))
			throw new InvalidAttributeError(
				`Invalid attribute '${name}' for category '${ProductsCategories[category]}'.}`
			)
	}
}
