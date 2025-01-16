import { Product } from './Product'

const products = [
	{
		id: '1',
		name: 'Essential White T-Shirt',
		price: 29.99,
    size: 'M',
		image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
	},
	{
		id: '2',
		name: 'Classic Black Jeans',
		price: 89.99,
    size: 'M',
		image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
	},
	{
		id: '3',
		name: 'Minimal Sweater',
		price: 79.99,
    size: 'M',
		image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2',
	},
	{
		id: '4',
		name: 'Linen Blazer',
		price: 149.99,
    size: 'M',
		image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
	},
	{
		id: '5',
		name: 'Cotton Dress',
		price: 119.99,
    size: 'M',
		image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
	},
	{
		id: '6',
		name: 'Wool Coat',
		price: 299.99,
    size: 'M',
		image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543',
	},
]

export const ProductsCatalog: React.FC = (): React.ReactNode => {
	return (
		<div>
			<div className='text-center mb-12'>
				<h1 className='text-3xl font-bold mb-4'>Our Collection</h1>
				<p className='text-gray-600'>Timeless pieces for your wardrobe</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				{products.map((product) => (
					<Product key={product.id} {...product} />
				))}
			</div>
		</div>
	)
}
