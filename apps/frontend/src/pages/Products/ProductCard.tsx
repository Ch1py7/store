import { useCartStore } from '@/shared/context/useCartStore'
import { ProductImage } from '@/shared/ui/ProductImage'
import { getSize } from '@/shared/utils'
import { useEffect, useState } from 'react'

interface ProductCardProps {
	id: string
	name: string
	description: string
	updatedAt: number
	createdAt: number
	price: number
	category: number
	stock: number
	attributes: { attribute_name: string; attribute_value: string }[]
}

export const ProductCard: React.FC<ProductCardProps> = (product): React.ReactNode => {
	const loading = useCartStore((state) => state.loading)
	const getProductQuantity = useCartStore((state) => state.getProductQuantity)
	const addProduct = useCartStore((state) => state.addProduct)
	const [size, setSize] = useState<number>(0)

	const handleAddProduct = (product: ProductCardProps) => {
		addProduct({ id: product.id, name: product.name, price: product.price, size })
	}

	useEffect(() => {
		product.attributes.forEach((atr) => {
			if (atr.attribute_name === 'size') {
				setSize(Number(atr.attribute_value))
			}
		})
	}, [product])

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
							{size !== 0 && `(${getSize[size]})`}
						</button>
					</h3>
					<p className='text-gray-600'>
						${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
					</p>
				</div>
			</div>
			<button
				type='button'
				className={`mt-2 w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 relative ${loading && 'bg-disabled'}`}
				onClick={() => handleAddProduct(product)}
				disabled={loading}
			>
				Add to Cart
				{!loading && getProductQuantity(product.id) !== 0 && (
					<span className='absolute right-5 bg-white text-black w-6 h-6 inline-block rounded-full'>
						{getProductQuantity(product.id)}
					</span>
				)}
			</button>
		</div>
	)
}
