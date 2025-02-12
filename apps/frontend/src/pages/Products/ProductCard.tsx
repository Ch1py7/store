import { LocalStorage } from '@/shared/context/localStorage'
import { useAuthStore } from '@/shared/context/useAuthStore'
import { useCartStore } from '@/shared/context/useCartStore'
import { ProductImage } from '@/shared/ui/ProductImage'
import { useContext } from 'react'

interface ProductCardProps {
	id: string
	name: string
	size: number[]
	sizeToShow: number
	price: number
	percentageDiscount: number
}

export const ProductCard: React.FC<ProductCardProps> = (product): React.ReactNode => {
	const { addToCart: localAddToCart, getProductQuantity: localGetProductQuantity } = useContext(
		LocalStorage.Context
	)
	const {
		addProduct: userAddProduct,
		getProductQuantity: userGetProductQuantity,
		loading,
	} = useCartStore()
	const { user } = useAuthStore()

	const handleAddProduct = (product: ProductCardProps) => {
		if (user) {
			userAddProduct({ ...product, size: product.sizeToShow })
		} else {
			localAddToCart({ ...product, size: product.sizeToShow })
		}
	}

	const handleProductQuantity = (id: string) => {
		if (user) {
			return userGetProductQuantity(id)
		}
		return localGetProductQuantity(id)
	}

	return (
		<div className='relative flex flex-col items-center justify-between'>
			<div>
				<button type='button' className='flex justify-center overflow-hidden shadow-md'>
					<ProductImage
						name={product.name}
						// todo: change it with image db
						source={'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'}
					/>
				</button>
				<div className='mt-4 w-full'>
					<h3 className='text-lg font-medium'>
						{product.name}{' '}
						<button type='button' className='text-disabled' title='click to see more sizes'>
							({product.sizeToShow})
						</button>
					</h3>
					<p className='text-gray-600'>${product.price}</p>
				</div>
			</div>
			<button
				type='button'
				className='mt-2 w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 relative'
				onClick={() => handleAddProduct(product)}
			>
				Add to Cart
				{!loading && Boolean(handleProductQuantity(product.id)) && (
					<span className='absolute right-5 bg-white text-black w-6 h-6 inline-block rounded-full'>
						{handleProductQuantity(product.id)}
					</span>
				)}
			</button>
		</div>
	)
}
