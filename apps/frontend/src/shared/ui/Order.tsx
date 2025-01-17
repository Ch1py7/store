import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { useContext } from 'react'
import { LocalStorage } from '../context/localStorage'

export const Order: React.FC<ProductCart | Product> = (product): React.ReactNode => {
	const { addToCart, restToCart, removeToCart, handleCheckouts, handleFavorites } = useContext(
		LocalStorage.Context
	)

	const wInterface = (product: Product | ProductCart): product is ProductCart => {
		return (
			(product as ProductCart).quantity !== undefined &&
			(product as ProductCart).toCheckout !== undefined
		)
	}

	const isCart = wInterface(product)

	return (
		<div className='flex flex-col xs:flex-row xs:items-center justify-between border-b pb-4'>
			<div className='flex flex-col xxs:flex-row items-start space-x-4 my-4 xs:my-0'>
				<div className='flex gap-2 justify-between xxs:justify-normal w-full xxs:w-auto'>
					{isCart && (
						<input
							type='checkbox'
							title='checkbox'
							checked={product.toCheckout}
							onChange={() => handleCheckouts(product.id)}
							className='self-center hidden xxs:block'
						/>
					)}
					<img
						src={product.image}
						alt={product.name}
						className='w-16 h-16 xs:w-20 xs:h-20 object-cover rounded flex-shrink-0'
					/>
					{isCart && (
						<input
							type='checkbox'
							title='checkbox'
							checked={product.toCheckout}
							onChange={() => handleCheckouts(product.id)}
							className='self-center block xxs:hidden'
						/>
					)}
				</div>
				<div className='flex-grow'>
					<p className='font-medium'>{product.name}</p>
					<p className='text-sm text-disabled'>{product.size ? `Size: ${product.size}` : ''}</p>
					<p className={`text-sm font-medium ${isCart && 'xs:hidden'}`}>
						${product.price.toFixed(2)} {isCart && 'each'}
					</p>
				</div>
			</div>
			<div
				className={`flex ${isCart ? 'justify-between' : 'justify-end'} items-center flex-col xxs:flex-row xs:flex-col xs:items-end xs:space-y-2`}
			>
				{isCart && (
					<>
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
							<p className='hidden xs:block text-sm font-medium mb-1'>
								${product.price.toFixed(2)} each
							</p>
							<p className='invisible xs:visible font-medium'>
								${(product.price * product.quantity).toFixed(2)}
							</p>
						</div>
					</>
				)}
				<div className='flex justify-between items-center w-full'>
					<p className='visible xs:invisible font-medium'>
						${isCart && (product.price * product.quantity).toFixed(2)}
					</p>
					{!isCart && (
						<div className='flex justify-start w-full'>
							<button
								type='button'
								onClick={() => (isCart ? removeToCart(product.id) : handleFavorites(product))}
								className='text-sm text-green-500 hover:text-green-700 flex items-center mt-2'
								aria-label='Add item'
							>
								<ShoppingCart className='h-4 w-4 mr-1' />
								<span className={`hidden ${isCart ? 'xs:inline' : 'xxxs:inline'}`}>Add</span>
							</button>
						</div>
					)}
					<button
						type='button'
						onClick={() => (isCart ? removeToCart(product.id) : handleFavorites(product))}
						className='text-sm text-red-500 hover:text-red-700 flex items-center xs:mt-2'
						aria-label='Remove item'
					>
						<Trash2 className='h-4 w-4 mr-1' />
						<span className={`hidden ${isCart ? 'xs:inline' : 'xxxs:inline'}`}>Remove</span>
					</button>
				</div>
			</div>
		</div>
	)
}
