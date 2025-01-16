import { Minus, Plus, Trash2 } from 'lucide-react'
import { useContext } from 'react'
import { LocalStorage } from '../context/localStorage'

export const Order: React.FC<ProductCart> = (product): React.ReactNode => {
	const { addToCart, restToCart, removeToCart, handleCheckouts } = useContext(LocalStorage.Context)
	return (
		<div className='flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4'>
			<div className='flex items-start space-x-4 my-4 sm:my-0'>
				<input
					type='checkbox'
					title='checkbox'
					checked={product.toCheckout}
					onChange={() => handleCheckouts(product.id)}
					className='self-center'
				/>
				<img
					src={product.image}
					alt={product.name}
					className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0'
				/>
				<div className='flex-grow'>
					<p className='font-medium'>{product.name}</p>
					<p className='text-sm text-disabled'>{product.size ? `Size: ${product.size}` : ''}</p>
					<p className='text-sm font-medium sm:hidden'>${product.price.toFixed(2)}</p>
				</div>
			</div>
			<div className='flex justify-between items-center sm:flex-col sm:items-end sm:space-y-2'>
				<div className='flex items-center space-x-3'>
					<button
						type='button'
						onClick={() => restToCart(product)}
						disabled={product.quantity === 1}
						className='p-1 rounded-full hover:bg-red-100'
						aria-label='Decrease quantity'
					>
						<Minus className={`h-4 w-4 ${product.quantity === 1 && 'text-disabled'}`} />
					</button>
					<span className='w-8 text-center'>{product.quantity}</span>
					<button
						type='button'
						onClick={() => addToCart(product)}
						className='p-1 rounded-full hover:bg-green-100'
						aria-label='Increase quantity'
					>
						<Plus className='h-4 w-4' />
					</button>
				</div>
				<div className='text-right'>
					<p className='hidden sm:block text-sm font-medium mb-1'>
						${product.price.toFixed(2)} each
					</p>
					<p className='font-medium'>${(product.price * product.quantity).toFixed(2)}</p>
				</div>
				<button
					type='button'
					onClick={() => removeToCart(product.id)}
					className='text-sm text-red-500 hover:text-red-700 flex items-center mt-2'
					aria-label='Remove item'
				>
					<Trash2 className='h-4 w-4 mr-1' />
					<span className='hidden sm:inline'>Remove</span>
				</button>
			</div>
		</div>
	)
}
