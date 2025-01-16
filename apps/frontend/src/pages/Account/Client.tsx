import { getCart, getFavorites } from '@/shared/service/localStorage'
import { Heart } from '@/shared/ui/Heart'
import { Input } from '@/shared/ui/Input'
import { getTotalCart } from '@/shared/utils'
import { ShoppingBag, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Client: React.FC = (): React.ReactNode => {
	const [user, setUser] = useState({ fname: '', lname: '', email: '', phone: '' })
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const [isFavHovered, setFavIsHovered] = useState<boolean>(false)
	const [cart, setCart] = useState<number>(0)
	const [favs, setFavs] = useState<string[]>([])

	const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target
		setUser((prev) => ({ ...prev, [name]: value }))
	}

	useEffect(() => {
		const cart = getCart()
		const favs = getFavorites()
		const total = getTotalCart(cart)
		setCart(total)
		setFavs(favs)
	}, [])

	return (
		<>
			<div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
				<div className='max-w-3xl mx-auto'>
					<div className='bg-white shadow rounded-lg p-8'>
						<div className='flex items-center justify-center mb-8'>
							<div className='h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center'>
								{isLogin ? <></> : <User className='h-12 w-12 text-disabled' />}
							</div>
						</div>
						<div className='space-y-6'>
							<div>
								<h2 className='text-2xl font-semibold text-center mb-8'>Client Dashboard</h2>
								<div className='grid grid-cols-2 gap-4 mb-8'>
									<Link to='/cart' className='border rounded-lg p-4 text-center'>
										<ShoppingBag className='h-8 w-8 mx-auto mb-2' />
										<p className='font-semibold'>Products in Cart</p>
										<p className='text-2xl font-bold'>{cart}</p>
									</Link>
									<Link
										to='/wishlist'
										className='border rounded-lg p-4 text-center'
										onMouseEnter={() => setFavIsHovered(true)}
										onMouseLeave={() => setFavIsHovered(false)}
									>
										<Heart classNames='h-8 w-8 mx-auto mb-2' like={isFavHovered} />
										<p className='font-semibold'>Wishlist</p>
										<p className='text-2xl font-bold'>{favs.length}</p>
									</Link>
								</div>
							</div>
							<div className='space-y-4'>
								<h3 className='text-lg font-semibold'>Personal Information</h3>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<p className='block text-sm font-medium text-gray-700'>First Name</p>
										<Input
											name='fname'
											onInput={onInput}
											placeholder='first name'
											value={user.fname}
										/>
									</div>
									<div>
										<p className='block text-sm font-medium text-gray-700'>Last Name</p>
										<Input
											name='lname'
											onInput={onInput}
											placeholder='last name'
											value={user.lname}
										/>
									</div>
									<div>
										<p className='block text-sm font-medium text-gray-700'>Email</p>
										<Input name='email' onInput={onInput} placeholder='email' value={user.email} />
									</div>
									<div>
										<p className='block text-sm font-medium text-gray-700'>Phone</p>
										<Input name='phone' onInput={onInput} placeholder='phone' value={user.phone} />
									</div>
								</div>
								<button
									type='button'
									className={'w-full bg-black hover:bg-gray-800 mt-4 text-white py-2 rounded-md'}
								>
									Save Changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
