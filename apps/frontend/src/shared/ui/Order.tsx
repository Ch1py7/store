import { Minus, Plus, Trash2 } from 'lucide-react'
import { useContext } from 'react'
import { LocalStorage } from '../context/localstorage'

export const Order: React.FC<ProductCart> = (product): React.ReactNode => {
	const { addToCart, restToCart, removeToCart } = useContext(LocalStorage.Context)
	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between border-b pb-4'>
				<div className='flex items-center space-x-4'>
					<img
						src={product.image}
						alt={product.name}
						className='w-16 h-16 object-cover rounded-lg'
					/>
					<div>
						<p className='font-medium'>{product.name}</p>
						<p className='text-sm text-gray-500'>{product.size ? 'Size: M' : ''}</p>
					</div>
				</div>
				<div className='text-right'>
					<div className='flex flex-col items-end space-y-2'>
						<div className='flex items-center space-x-2'>
							<button
								onClick={() => restToCart(product)}
								type='button'
								className='p-1 rounded-full hover:bg-gray-100'
								disabled={product.quantity === 1}
							>
								<Minus className={`h-4 w-4 ${product.quantity === 1 && 'text-gray-400'}`} />
							</button>
							<span className='w-8 text-center'>{product.quantity}</span>
							<button
								onClick={() => addToCart(product)}
								type='button'
								className='p-1 rounded-full hover:bg-gray-100'
							>
								<Plus className='h-4 w-4' />
							</button>
						</div>
						<p className='font-medium'>
							$
							{product.price &&
								product.quantity &&
								(product.price * product.quantity).toLocaleString('en-US', {
									minimumFractionDigits: 2,
								})}
						</p>
						<button
							onClick={() => removeToCart(product.id)}
							type='button'
							className='text-sm text-red-500 hover:text-red-700 flex items-center'
						>
							<Trash2 className='h-4 w-4 mr-1' />
							Remove
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
