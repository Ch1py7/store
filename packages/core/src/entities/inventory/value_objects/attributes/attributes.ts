import { InvalidAttributesError } from './errors'

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
	[ProductsCategories.Clothing]: ['size', 'color', 'gender', 'season', 'style', 'type'],
	[ProductsCategories.Technology]: [
		'model',
		'processor',
		'ram',
		'storage',
		'display',
		'battery',
		'connectivity',
	],
	[ProductsCategories.Reading]: ['powerConsumption', 'intendedUse'],
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

export class Attributes {
	public readonly value: Record<string, string>

	constructor(value: Record<string, string>, category: number) {
		this._validateAttributes(value, category)
		this.value = value
	}

	private _validateAttributes(attributes: Record<string, string>, category: ProductsCategories) {
		if (!attributesConfig[category]) {
			throw new InvalidAttributesError(`Invalid category: ${category}`)
		}

		const allowedAttributes = [...attributesConfig.general, ...attributesConfig[category]]
		const allowedAttributesSet = new Set(allowedAttributes) // Usar Set para mejor rendimiento

		for (const key of Object.keys(attributes)) {
			if (!allowedAttributesSet.has(key)) {
				throw new InvalidAttributesError(
					`Invalid attribute '${key}' for category '${ProductsCategories[category]}'. Allowed attributes: ${allowedAttributes.join(', ')}`
				)
			}
		}
	}
}
