import { useAuthStore } from '@/shared/context/useAuthStore'
import { toasty } from '@/shared/lib/notifications/toast'
import { LoginValidations } from '@/shared/service/validations/login'
import { AxiosError } from 'axios'
import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

type Inputs = {
	email: string
	password: string
}

export const Login: React.FC = (): React.ReactNode => {
	const [error, setError] = useState<Record<string, string>>({})
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm<Inputs>()
	const { login } = useAuthStore()

	const onSubmit: SubmitHandler<Inputs> = async (inputsData) => {
		const validationErrors = new LoginValidations(inputsData).validate()
		setError(validationErrors)

		if (Object.keys(validationErrors).length > 0) {
			toasty.error('Please fix the highlighted errors.')
			return
		}

		try {
			const dataToSend = { ...inputsData }
			const { data, status } = await login(dataToSend)
			if (status === 200) {
				toasty.success(data.message)
			}
		} catch (er) {
			if (er instanceof AxiosError && er.response?.data?.error) {
				toasty.error(er.response.data.error)
			} else {
				toasty.error('An unexpected error occurred. Please try again later.')
			}
		}
	}

	const changeErrors = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError((prev) => {
			const newErrors = { ...prev }
			delete newErrors[e.target.name]
			return newErrors
		})
	}
	return (
		<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg mx-auto'>
			<div className='text-center'>
				<ShoppingBag className='mx-auto h-12 w-12' />
				<h2 className='mt-6 text-3xl font-bold text-gray-900'>Welcome Back</h2>
			</div>
			<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
				<div className='rounded-md shadow-sm space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Email address
							<input
								{...register('email')}
								onInput={changeErrors}
								className={`mt-1 block w-full px-3 py-2 shadow-sm border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
							/>
						</label>
						{error.email && <p className='mt-2 text-sm text-red-600'>{error.email}</p>}
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Password
							<input
								{...register('password')}
								onInput={changeErrors}
								type='password'
								className={`mt-1 block w-full px-3 py-2 shadow-sm border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
							/>
						</label>
						{error.password && <p className='mt-2 text-sm text-red-600'>{error.password}</p>}
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
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800'
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
