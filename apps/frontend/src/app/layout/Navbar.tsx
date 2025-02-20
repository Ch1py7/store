import { useAuthStore } from '@/shared/context/useAuthStore'
import { useCartStore } from '@/shared/context/useCartStore'
import { toasty } from '@/shared/lib/notifications/toast'
import { Input } from '@/shared/ui/Input'
import { Modal } from '@/shared/ui/Modal'
import { AlertCircle, LogIn, LogOut, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu } from './Menu'

export const Navbar: React.FC = (): React.ReactNode => {
	const [showModal, setShowModal] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const { user, checkAuth, logout, loading } = useAuthStore()
	const { getCart, getProductsQuantity } = useCartStore()

	const logoutSession = async () => {
		await logout()
		setShowModal(false)
		toasty.success('Session closed successfully')
		navigate('/')
	}

	useEffect(() => {
		checkAuth()
	}, [checkAuth])

	useEffect(() => {
		if (loading) {
			getCart()
		}
	}, [loading, getCart])

	return (
		<nav className='pb-12'>
			<Modal
				showModal={showModal}
				setShowModal={() => setShowModal((prev) => !prev)}
				title='Confirmation'
			>
				<div className='p-4 text-center'>
					<AlertCircle className='w-16 h-16 mx-auto text-gray-500' />
					<h3 className='mb-5 mt-3 text-lg font-normal text-black'>
						Are you sure you want to leave the session?
					</h3>
					<button
						type='button'
						className='text-white bg-red-700 hover:bg-red-500 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
						onClick={() => logoutSession()}
					>
						Yes, I'm sure
					</button>
					<button
						type='button'
						className='py-2.5 px-5 ms-3 text-sm font-medium text-white bg-black rounded-lg border border-gray-200 hover:bg-gray-700'
						onClick={() => setShowModal((prev) => !prev)}
					>
						No, cancel
					</button>
				</div>
			</Modal>
			<div className='flex justify-between items-center px-4 sm:px-6 lg:px-8'>
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
						{getProductsQuantity() > 0 && (
							<span className='absolute transform -translate-y-1/2 font-semibold bg-black right-0 -top-3 rounded-full text-center w-6 h-6 text-white text-sm flex justify-center items-center'>
								{getProductsQuantity() > 9 ? '9+' : getProductsQuantity()}
							</span>
						)}
					</Link>
					{!user ? (
						<Link to='/auth/login' className='text-gray-700 hover:text-black flex items-center'>
							<LogIn className='h-5 w-5' />
						</Link>
					) : (
						<button
							onClick={() => setShowModal(true)}
							type='button'
							className='text-gray-700 hover:text-black flex items-center'
						>
							<LogOut className='h-4 w-4' />
						</button>
					)}
				</div>
				<div className='min-h-6 min-w-6'>
					<Menu
						isLogin={Boolean(user)}
						cartCount={getProductsQuantity()}
						setShowModal={setShowModal}
					/>
				</div>
			</div>
		</nav>
	)
}
