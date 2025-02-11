import { toasty } from '@/shared/lib/notifications/toast'
import { validateEmail } from '@/shared/lib/validators'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const badEmailStructure =
	'Invalid email format. Please enter a valid email address (e.g., user@example.com).'

export const Recovery: React.FC = (): React.ReactNode => {
	const [email, setEmail] = useState<string>('')

	const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setEmail(value)
	}

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (validateEmail(email)) {
			toasty.error(badEmailStructure)
			return
		}
	}

	return (
		<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg mx-auto'>
			<div className='text-center'>
				<h2 className='mt-6 text-3xl font-bold text-gray-900'>Reset your password!</h2>
			</div>
			<form className='mt-8 space-y-6' onSubmit={onSubmit}>
				<div className='rounded-md shadow-sm space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Email address
							<input
								name='email'
								required
								onInput={onInput}
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
							/>
						</label>
					</div>
				</div>
				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800'
				>
					Send new password
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
