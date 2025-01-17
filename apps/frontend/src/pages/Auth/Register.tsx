import { Building2, ShoppingBag, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Register: React.FC = (): React.ReactNode => {
	const [isBusinessRegister, setIsBusinessRegister] = useState(false)

	return (
		<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg mx-auto'>
			<div className='text-center'>
				<ShoppingBag className='mx-auto h-12 w-12' />
				<h2 className='mt-6 text-3xl font-bold text-gray-900'>
					{isBusinessRegister ? 'Register Your Business' : 'Create an Account'}
				</h2>
				<p className='mt-2 text-sm text-gray-600'>
					{isBusinessRegister
						? 'Join our marketplace as a seller'
						: 'Join our community of fashion enthusiasts'}
				</p>
			</div>

			<div className='flex justify-center space-x-4 mb-8'>
				<button
					type='button'
					onClick={() => {
						setIsBusinessRegister(false)
					}}
					className={`flex items-center px-4 py-2 rounded-md ${
						!isBusinessRegister ? 'bg-black text-white' : 'bg-gray-100'
					}`}
				>
					<User className='h-4 w-4 mr-2' />
					Client
				</button>
				<button
					type='button'
					onClick={() => {
						setIsBusinessRegister(true)
					}}
					className={`flex items-center px-4 py-2 rounded-md ${
						isBusinessRegister ? 'bg-black text-white' : 'bg-gray-100'
					}`}
				>
					<Building2 className='h-4 w-4 mr-2' />
					Business
				</button>
			</div>

			<form className='mt-8 space-y-6'>
				<div className='rounded-md shadow-sm space-y-4'>
					{isBusinessRegister ? (
						<>
							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Business Name
									<input
										name='name'
										type='text'
										required
										maxLength={20}
										className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black'
									/>
								</label>
							</div>
						</>
					) : (
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name
								<input
									name='name'
									type='text'
									required
									maxLength={20}
									className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black'
								/>
							</label>
						</div>
					)}

					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Email address
							<input
								name='email'
								required
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black'
							/>
						</label>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Password
							<input
								name='password'
								type='password'
								required
								maxLength={20}
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black'
							/>
						</label>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Confirm Password
							<input
								name='confirmPassword'
								type='password'
								required
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black'
							/>
						</label>
					</div>
				</div>

				{isBusinessRegister && (
					<div className='text-sm text-gray-600'>
						By registering, you agree to our terms of service and seller agreement.
					</div>
				)}

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
				>
					Create Account
				</button>

			</form>
				<div className='text-center'>
					<span className='text-sm text-gray-600'>Already have an account? </span>
					<Link to='/auth/login' className='text-sm font-medium text-black hover:text-gray-800'>
						Sign in
					</Link>
				</div>
		</div>
	)
}
