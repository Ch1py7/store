import { LocalStorage } from '@/shared/context/localstorage'
import { Input } from '@/shared/ui/Input'
import { LogIn, LogOut, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from './Menu'

export const Navbar: React.FC = (): React.ReactNode => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const { getProductsQuantity } = useContext(LocalStorage.Context)

	return (
		<nav>
			<div className='flex justify-between items-center'>
				<Link to='/' className='flex items-center space-x-2'>
					<ShoppingBag className='h-6 w-6' />
					<span className='hidden sm:block font-semibold text-xl'>MINIMALIST</span>
				</Link>
				<div className='w-full max-w-7xl mx-4 sm:mx-10'>
					<Input placeholder='Search product' inputRef={inputRef} />
				</div>
				<div className='hidden sm:flex space-x-8'>
					<Link to='/' className='text-gray-700 hover:text-black flex items-center'>
						Shop
					</Link>
					<Link to='/account' className='text-gray-700 hover:text-black flex items-center'>
						Account
					</Link>
					<Link to='/cart' className='text-gray-700 hover:text-black flex items-center relative'>
						<ShoppingCart />
						{Boolean(getProductsQuantity()) && (
							<span className='absolute transform -translate-y-1/2 font-semibold bg-black right-0 -top-2 rounded-full text-center w-5 h-5 text-white text-sm'>
								{getProductsQuantity()}
							</span>
						)}
					</Link>
					{!isLogin ? (
						<Link to='/auth/login' className='text-gray-700 hover:text-black flex items-center'>
							<LogIn className='h-5 w-5' />
						</Link>
					) : (
						<button type='button' className='text-gray-700 hover:text-black flex items-center'>
							<LogOut className='h-4 w-4' />
						</button>
					)}
				</div>
				<div className='min-h-6 min-w-6'>
					<Menu isLogin={isLogin} />
				</div>
			</div>
		</nav>
	)
}
