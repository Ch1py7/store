import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Login: React.FC = (): React.ReactNode => {
	return (
		<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg mx-auto'>
			<div className='text-center'>
				<ShoppingBag className='mx-auto h-12 w-12' />
				<h2 className='mt-6 text-3xl font-bold text-gray-900'>Welcome Back</h2>
			</div>
			<form className='mt-8 space-y-6'>
				<div className='rounded-md shadow-sm space-y-4'>
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
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black'
							/>
						</label>
					</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<input
							id='remember-me'
							name='remember-me'
							type='checkbox'
							className='h-4 w-4 border-gray-300 rounded'
						/>
						<label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
							Remember me
						</label>
					</div>
					<div className='text-sm'>
						<a href='recovery' className='font-medium text-black hover:text-gray-800'>
							Forgot password?
						</a>
					</div>
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
				>
					Sign in
				</button>
			</form>
			<div className='text-center'>
				<span className='text-sm text-gray-600'>Don't have an account? </span>
				<Link to='/auth/register' className='text-sm font-medium text-black hover:text-gray-800'>
					Sign up
				</Link>
			</div>
			<div className='text-center'>
				<span className='text-sm text-gray-600'>Do you lose your activation? </span>
				<Link to='/auth/validation' className='text-sm font-medium text-black hover:text-gray-800'>
					Recovere it
				</Link>
			</div>
		</div>
	)
}
