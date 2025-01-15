import { Heart } from '@/shared/ui/Heart'
import { ProductImage } from '@/shared/ui/ProductImage'
import { useState } from 'react'

interface Product {
	id: string
	name: string
	image: string
	price: number
}

export const Product = (product: Product) => {
	const [isHovered, setIsHovered] = useState<boolean>(false)
	return (
		<div className='relative flex flex-col items-center'>
			<button type='button' className='flex justify-center overflow-hidden shadow-md'>
				<ProductImage height='400px' name={product.name} source={product.image} />
			</button>
			<button
				type='button'
				className='absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Heart like={isHovered} />
			</button>
			<div className='mt-4 w-full'>
				<h3 className='text-lg font-medium'>{product.name}</h3>
				<p className='text-gray-600'>${product.price}</p>
				<button
					type='button'
					className='mt-2 w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800'
				>
					Add to Cart
				</button>
			</div>
		</div>
	)
}
