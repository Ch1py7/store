import { Check, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Validation: React.FC = (): React.ReactNode => {
	const [code, setCode] = useState<string>('')
	const [isCodeRecovery, setIsCodeRecovery] = useState(false)

	return (
		<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg mx-auto'>
			{code && (
				<h3 className='flex items-center px-4 py-2 rounded-md bg-black text-white justify-center'>
					{code}
				</h3>
			)}
			<div className='flex justify-center space-x-4 mb-8'>
				<button
					type='button'
					onClick={() => {
						setIsCodeRecovery(false)
					}}
					className={`flex items-center px-4 py-2 rounded-md ${
						!isCodeRecovery ? 'bg-black text-white' : 'bg-gray-100'
					}`}
				>
					<Check className='h-4 w-4 mr-2' />
					Activation
				</button>
				<button
					type='button'
					onClick={() => {
						setIsCodeRecovery(true)
					}}
					className={`flex items-center px-4 py-2 rounded-md ${
						isCodeRecovery ? 'bg-black text-white' : 'bg-gray-100'
					}`}
				>
					<RotateCcw className='h-4 w-4 mr-2' />
					Recovery
				</button>
			</div>
			<div className='text-center'>
				<h2 className='mt-6 text-3xl font-bold text-gray-900'>Validate your code!</h2>
			</div>
			<form className='mt-8 space-y-6'>
				<div className='rounded-md shadow-sm space-y-4'>
					<div>
						{isCodeRecovery ? (
							<label className='block text-sm font-medium text-gray-700'>
								Password
								<input
									name='password'
									type='password'
									required
									className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
								/>
							</label>
						) : (
							<label className='block text-sm font-medium text-gray-700'>
								Token (Copy it or don't forget it)
								<input
									name='validation_code'
									required
									className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
								/>
							</label>
						)}
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Email address
							<input
								name='email'
								required
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
							/>
						</label>
					</div>
				</div>
				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800'
				>
					Validate
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
