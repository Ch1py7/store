import { Input } from '@/shared/ui/Input'
import { LogIn, LogOut, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from './Menu'

export const Navbar: React.FC = (): React.ReactNode => {
	const [isLogin, setIsLogin] = useState<boolean>(false)
	return (
		<nav>
			<div className='flex justify-between items-center'>
				<Link to='/' className='flex items-center space-x-2'>
					<ShoppingBag className='h-6 w-6' />
					<span className='hidden sm:block font-semibold text-xl'>MINIMALIST</span>
				</Link>
				<Input />
				<div className='hidden sm:flex space-x-8'>
					<Link to='/' className='text-gray-700 hover:text-black flex items-center'>
						Shop
					</Link>
					<Link to='/client' className='text-gray-700 hover:text-black flex items-center'>
						Account
					</Link>
					<Link to='/purchase' className='text-gray-700 hover:text-black flex items-center'>
						Cart
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
