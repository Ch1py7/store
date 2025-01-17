import { LocalStorage } from '@/shared/context/localStorage'
import { Heart } from '@/shared/ui/Heart'
import { ProductImage } from '@/shared/ui/ProductImage'
import { useCallback, useContext, useState } from 'react'

export const Product = (product: Product) => {
	const { addToCart, favorites, getProductQuantity, handleFavorites } = useContext(
		LocalStorage.Context
	)
	const [isHovered, setIsHovered] = useState<boolean>(false)

	const isFav = useCallback(
		(id: string) => {
			return favorites.findIndex((fav) => fav.id === id) !== -1
		},
		[favorites]
	)

	return (
		<div className='relative flex flex-col items-center'>
			<button
				type='button'
				className='flex justify-center overflow-hidden shadow-md'
				onDoubleClick={() => handleFavorites(product)}
			>
				<ProductImage name={product.name} source={product.image} />
			</button>
			<button
				type='button'
				className='absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => handleFavorites(product)}
			>
				<Heart like={isHovered || isFav(product.id)} />
			</button>
			<div className='mt-4 w-full'>
				<h3 className='text-lg font-medium'>
					{product.name}{' '}
					<button type='button' className='text-disabled' title='click to see more sizes'>
						({product.size})
					</button>
				</h3>
				<p className='text-gray-600'>${product.price}</p>
				<button
					type='button'
					className='mt-2 w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 relative'
					onClick={() => addToCart(product)}
				>
					Add to Cart
					{Boolean(getProductQuantity(product.id)) && (
						<span className='absolute right-5 bg-white text-black w-6 h-6 inline-block rounded-full'>
							{getProductQuantity(product.id)}
						</span>
					)}
				</button>
			</div>
		</div>
	)
}
