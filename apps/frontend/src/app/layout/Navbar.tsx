import { LocalStorage } from '@/shared/context/localStorage'
import { Input } from '@/shared/ui/Input'
import { LogIn, LogOut, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useContext, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from './Menu'

export const Navbar: React.FC = (): React.ReactNode => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const { getProductsQuantity } = useContext(LocalStorage.Context)
	const { pathname } = useLocation()

	return (
		<nav className='pb-12'>
			<div className='flex justify-between items-center'>
				<Link to='/' className='flex items-center space-x-2'>
					<ShoppingBag className='h-6 w-6' />
					<span className='hidden sm:block font-semibold text-xl'>MINIMALIST</span>
				</Link>
				<div className='w-full max-w-7xl mx-4 sm:mx-10'>
					<Input placeholder='Search product' inputRef={inputRef} />
				</div>
				<div className='hidden sm:flex space-x-8'>
					{pathname !== '/' && (
						<Link to='/' className='text-gray-700 hover:text-black flex items-center'>
							Shop
						</Link>
					)}
					{pathname !== '/account' && (
						<Link to='/account' className='text-gray-700 hover:text-black flex items-center'>
							Account
						</Link>
					)}
					<Link to='/cart' className='text-gray-700 hover:text-black flex items-center relative'>
						<ShoppingCart />
						{Boolean(getProductsQuantity()) && (
							<span className='absolute transform -translate-y-1/2 font-semibold bg-black right-0 -top-3 rounded-full text-center w-6 h-6 text-white text-sm flex justify-center items-center'>
								{getProductsQuantity() > 9 ? '9+' : getProductsQuantity()}
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
