import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore, type Product } from '../context/useCartStore'

export const Order: React.FC<Product> = (product): React.ReactNode => {
	const { addProduct, restProduct, removeProduct, loading, total, handleCheckout } = useCartStore()
	return (
		<div className='flex flex-col xs:flex-row xs:items-center justify-between border-b pb-4'>
			<div className='flex flex-col xxs:flex-row items-start space-x-4 my-4 xs:my-0'>
				<div className='flex gap-2 justify-between xxs:justify-normal w-full xxs:w-auto'>
					<input
						type='checkbox'
						title='checkbox'
						checked={product.toCheckout}
						onChange={() => handleCheckout(product.id)}
						className='self-center hidden xxs:block'
					/>
					<img
						// todo: change it with image db
						src={'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'}
						alt={product.name}
						className='w-16 h-16 xs:w-20 xs:h-20 object-cover rounded flex-shrink-0'
					/>
					<input
						type='checkbox'
						title='checkbox'
						checked={product.toCheckout}
						onChange={() => handleCheckout(product.id)}
						className='self-center block xxs:hidden'
					/>
				</div>
				<div className='flex-grow'>
					<p className='font-medium'>{product.name}</p>
					<p className='text-sm text-disabled'>{product.size ? `Size: ${product.size}` : ''}</p>
					<p className='text-sm font-medium xs:hidden'>${product.price.toFixed(2)} each</p>
				</div>
			</div>
			<div className='flex justify-between items-center flex-col xxs:flex-row xs:flex-col xs:items-end xs:space-y-2'>
				<div className='flex items-center space-x-3'>
					<button
						type='button'
						onClick={() => restProduct(product)}
						disabled={product.quantity === 1 || loading}
						className='p-1 rounded-full hover:bg-red-100'
						aria-label='Decrease quantity'
					>
						<Minus className={`h-4 w-4 ${product.quantity === 1 && 'text-disabled'}`} />
					</button>
					<span className='w-8 text-center'>{product.quantity}</span>
					<button
						type='button'
						onClick={() => addProduct(product)}
						className='p-1 rounded-full hover:bg-green-100'
						aria-label='Increase quantity'
						disabled={loading}
					>
						<Plus className={`h-4 w-4 ${loading && 'text-disabled'}`} />
					</button>
				</div>
				<div className='text-right'>
					<p className='hidden xs:block text-sm font-medium mb-1'>
						${product.price.toFixed(2)} each
					</p>
					<p className='invisible xs:visible font-medium'>${total}</p>
				</div>
				<div className='flex justify-between items-center w-full'>
					<p className='visible xs:invisible font-medium'>${total}</p>
					<button
						type='button'
						onClick={() => removeProduct(product.id)}
						className='text-sm text-red-500 hover:text-red-700 flex items-center xs:mt-2'
						aria-label='Remove item'
					>
						<Trash2 className='h-4 w-4 mr-1' />
						<span className='hidden xs:inline'>Remove</span>
					</button>
				</div>
			</div>
		</div>
	)
}
