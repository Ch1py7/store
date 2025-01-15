import { LogIn, LogOut, MenuIcon, ShoppingBag, ShoppingCart, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface MenuProps {
	isLogin: boolean
}

export const Menu: React.FC<MenuProps> = ({ isLogin }): React.ReactNode => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
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
					<div className='block sm:hidden absolute border -top-2 -right-2 border-solid border-gray-400 rounded-lg min-w-36 p-2 bg-white'>
						<button
							onClick={() => setIsOpen((prev) => !prev)}
							title='menu'
							type='button'
							className='block sm:hidden w-6 h-6 ml-auto'
						>
							<X />
						</button>
						<div className='flex flex-col gap-1'>
							<Link to='/' className='text-gray-700 hover:text-black flex items-center gap-2'>
								<ShoppingBag className='w-4 h-4' />
								Shop
							</Link>
							<Link to='/client' className='text-gray-700 hover:text-black flex items-center gap-2'>
								<User className='w-4 h-4' />
								Account
							</Link>
							<Link
								to='/purchase'
								className='text-gray-700 hover:text-black flex items-center gap-2'
							>
								<ShoppingCart className='w-4 h-4' />
								Cart
							</Link>
							{!isLogin ? (
								<Link
									to='/auth/login'
									className='text-gray-700 hover:text-black flex items-center gap-2'
								>
									<LogIn className='h-4 w-4' />
									Log-In
								</Link>
							) : (
								<button
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
