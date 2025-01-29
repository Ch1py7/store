import { Product } from '@/entities/product/product'
import { InvalidProductsError } from './errors'

export class Products {
	private readonly _products: ProductWithQuantity[]

	constructor(products: ProductWithQuantity[]) {
		this._assertValidProducts(products)
		this._products = products.map((p) => ({
			product: p.product,
			quantity: p.quantity,
		}))
	}

	get Products(): ProductWithQuantity[] {
		return this._products
	}

	get totalPrice(): number {
		return this._products.reduce((prev, { product, quantity }) => {
			const discountedPrice = product.price * (1 - product.percentageDiscount / 100)
			return prev + discountedPrice * quantity
		}, 0)
	}

	addProduct(product: Product, quantity: number): Products {
		this._assertValidQuantity(quantity)
		const existingProduct = this._products.find((p) => p.product.id === product.id)

		if (existingProduct) {
			const updatedProducts = this._products.map((p) =>
				p.product.id === product.id ? { product: p.product, quantity: p.quantity + quantity } : p
			)
			return new Products(updatedProducts)
		}

		return new Products([...this._products, { product, quantity }])
	}

	removeProduct(productId: string): Products {
		const updatedProducts = this._products.filter((p) => p.product.id !== productId)
		return new Products(updatedProducts)
	}

	private _assertValidProducts(products: ProductWithQuantity[]) {
		if (!products || products.length === 0) {
			throw new InvalidProductsError('The products list cannot be empty.')
		}
		products.forEach(({ product, quantity }) => {
			if (!(product instanceof Product)) {
				throw new InvalidProductsError('Invalid product provided.')
			}
			this._assertValidQuantity(quantity)
		})
	}

	private _assertValidQuantity(quantity: number) {
		if (!Number.isInteger(quantity) || quantity <= 0) {
			throw new InvalidProductsError('Product quantity must be a positive integer.')
		}
	}
}

export interface ProductWithQuantity {
	product: Product
	quantity: number
}
