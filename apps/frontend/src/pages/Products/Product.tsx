import { addProduct, getFavorites, handleFavorite } from '@/shared/service/localStorage'
import { Heart } from '@/shared/ui/Heart'
import { ProductImage } from '@/shared/ui/ProductImage'
import { useCallback, useState } from 'react'

export const Product = (product: Product) => {
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const favs = getFavorites()
	const isFav = useCallback(
		(id: string) => {
			return favs.findIndex((fav) => fav === id) !== -1
		},
		[favs]
	)

	return (
		<div className='relative flex flex-col items-center'>
			<button type='button' className='flex justify-center overflow-hidden shadow-md'>
				<ProductImage height='h-[400px]' name={product.name} source={product.image} />
			</button>
			<button
				type='button'
				className='absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => {
					handleFavorite(product.id)
				}}
			>
				<Heart like={isHovered || isFav(product.id)} />
			</button>
			<div className='mt-4 w-full'>
				<h3 className='text-lg font-medium'>{product.name}</h3>
				<p className='text-gray-600'>${product.price}</p>
				<button
					type='button'
					className='mt-2 w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800'
					onClick={() => addProduct(product.id)}
				>
					Add to Cart
				</button>
			</div>
		</div>
	)
}
