import { ProductsService } from '@/shared/service/requests/products'
import { getRequest } from '@/shared/service/requests/requests'
import { useCallback, useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'

interface Products {
	id: string
	name: string
	description: string
	percentageDiscount: number
	price: number
	size: number[]
	sizeToShow: number
	stock: number
}

export const ProductsCatalog: React.FC = (): React.ReactNode => {
	const [products, setProducts] = useState<Products[] | null>(null)

	const getProducts = useCallback(async () => {
		const { response } = await getRequest<{ data: Products[] }>(ProductsService.get())
		setProducts(response.data)
	}, [])

	useEffect(() => {
		getProducts()
	}, [getProducts])

	return (
		<>
			<div className='text-center mb-12'>
				<h1 className='text-3xl font-bold mb-4'>Our Collection</h1>
				<p className='text-gray-600'>Timeless pieces for your wardrobe</p>
			</div>
			{products ? (
				<div className='grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{products.map((product) => (
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			) : (
				<div className='min-h-[200px] grid place-items-center'>
					<div className='loader' />
				</div>
			)}
		</>
	)
}
