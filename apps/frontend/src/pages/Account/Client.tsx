import { useAuthStore } from '@/shared/context/useAuthStore'
import { useCartStore } from '@/shared/context/useCartStore'
import { Input } from '@/shared/ui/Input'
import { ShoppingBag, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Client: React.FC = (): React.ReactNode => {
	const { user, loading, isAuthenticated } = useAuthStore()
	const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '' })
	const { productsQuantity } = useCartStore()

	const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target
		setUserData((prev) => ({ ...prev, [name]: value }))
	}

	useEffect(() => {
		if (user) {
			setUserData(user)
		}
	}, [user])

	return (
		<div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto'>
				{!loading && (
					<div className='bg-white shadow rounded-lg p-8'>
						<div className='flex items-center justify-center mb-8'>
							<div className='h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center'>
								{isAuthenticated ? (
									// todo: change it with image db
									<User className='h-12 w-12' />
								) : (
									<User className='h-12 w-12 text-disabled' />
								)}
							</div>
						</div>
						<div className='space-y-6'>
							<h2 className='text-2xl font-semibold text-center mb-8'>Client Dashboard</h2>
							<div className='grid grid-cols-1 gap-4 mb-8'>
								<Link to='/cart' className='border rounded-lg p-4 text-center'>
									<ShoppingBag className='h-8 w-8 mx-auto mb-2' />
									<p className='font-semibold'>Products in Cart</p>
									<p className='text-2xl font-bold'>{productsQuantity}</p>
								</Link>
							</div>
							<div className='space-y-4'>
								<h3 className='text-lg font-semibold'>Personal Information</h3>
								<div className='grid grid-cols-1 xxs:grid-cols-2 gap-4'>
									<div>
										<p className='block text-sm font-medium text-gray-700'>First Name</p>
										<Input
											name='firstName'
											onInput={onInput}
											placeholder='first name'
											value={userData.firstName}
										/>
									</div>
									<div>
										<p className='block text-sm font-medium text-gray-700'>Last Name</p>
										<Input
											name='lastName'
											onInput={onInput}
											placeholder='last name'
											value={userData.lastName}
										/>
									</div>
									<div>
										<p className='block text-sm font-medium text-gray-700'>Email</p>
										<Input
											name='email'
											id='account-email'
											disabled
											onInput={onInput}
											placeholder='email'
											value={userData.email}
										/>
									</div>
									{/* TODO: Add phone field in backend
										<div>
											<p className='block text-sm font-medium text-gray-700'>Phone</p>
											<Input
												name='phone'
												onInput={onInput}
												placeholder='phone'
												value={userData.phone}
											/>
										</div> */}
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
				)}
			</div>
		</div>
	)
}
