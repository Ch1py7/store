import { useCartStore } from '@/shared/context/useCartStore'
import { LogIn, LogOut, MenuIcon, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface MenuProps {
	isLogin: boolean
	cartCount: number
}

export const Menu: React.FC<MenuProps> = ({ isLogin, cartCount }): React.ReactNode => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { pathname } = useLocation()
	const { loading } = useCartStore()
	return (
		<>
			<div className='relative z-50'>
				{!isOpen ? (
					<button
						onClick={() => setIsOpen((prev) => !prev)}
						title='menu'
						type='button'
						className='block sm:hidden w-6 h-6'
					>
						<MenuIcon />
					</button>
				) : (
					<div className='block sm:hidden absolute border -top-2 -right-2 border-solid border-disabled rounded-lg min-w-36 p-2 bg-white'>
						<button
							onClick={() => setIsOpen((prev) => !prev)}
							title='menu'
							type='button'
							className='block sm:hidden w-6 h-6 ml-auto'
						>
							<X />
						</button>
						<div className='flex flex-col gap-1'>
							{pathname !== '/' && (
								<Link
									onClick={() => setIsOpen((prev) => !prev)}
									to='/'
									className='text-gray-700 hover:text-black flex items-center'
								>
									Shop
								</Link>
							)}
							{pathname !== '/account' && (
								<Link
									onClick={() => setIsOpen((prev) => !prev)}
									to='/account'
									className='text-gray-700 hover:text-black flex items-center'
								>
									Account
								</Link>
							)}
							<Link
								onClick={() => setIsOpen((prev) => !prev)}
								to='/cart'
								className='text-gray-700 hover:text-black flex justify-between'
							>
								<div className='flex items-center gap-2'>
									<ShoppingCart className='w-4 h-4' />
									Cart
								</div>
								{!loading && cartCount > 0 && (
									<span className='font-semibold bg-black right-0 -top-3 rounded-full text-center w-6 h-6 text-white text-sm flex justify-center items-center'>
										{cartCount > 9 ? '9+' : cartCount}
									</span>
								)}
							</Link>
							{!isLogin ? (
								<Link
									onClick={() => setIsOpen((prev) => !prev)}
									to='/auth/login'
									className='text-gray-700 hover:text-black flex items-center gap-2'
								>
									<LogIn className='h-4 w-4' />
									Log-In
								</Link>
							) : (
								<button
									onClick={() => setIsOpen((prev) => !prev)}
									type='button'
									className='text-gray-700 hover:text-black flex items-center gap-2'
								>
									<LogOut className='h-4 w-4' />
									Log-Out
								</button>
							)}
						</div>
					</div>
				)}
			</div>

			{isOpen && (
				<button
					title=''
					type='button'
					onClick={() => setIsOpen(false)}
					className='block sm:hidden absolute h-screen w-screen left-0 right-0 top-0 bottom-0 cursor-default'
				/>
			)}
		</>
	)
}
