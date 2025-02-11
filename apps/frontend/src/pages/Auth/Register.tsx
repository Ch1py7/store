import { LocalStorage } from '@/shared/context/localStorage'
import { useAuthStore } from '@/shared/context/useAuthStore'
import { toasty } from '@/shared/lib/notifications/toast'
import { RegisterValidations } from '@/shared/service/validations/register'
import { AxiosError } from 'axios'
import { Building2, ShoppingBag, User } from 'lucide-react'
import { useContext, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

type Inputs = {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
	businessName: string
}

export const Register: React.FC = (): React.ReactNode => {
	const [isBusinessRegister, setIsBusinessRegister] = useState(false)
	const [includeCart, setIncludeCart] = useState(true)
	const [error, setError] = useState<Record<string, string>>({})
	const { cart } = useContext(LocalStorage.Context)
	const navigate = useNavigate()
	const { register, handleSubmit, reset } = useForm<Inputs>()
	const { register: userRegistration } = useAuthStore()

	const onSubmit: SubmitHandler<Inputs> = async (inputsData) => {
		const validationErrors = new RegisterValidations(inputsData, isBusinessRegister).validate()
		setError(validationErrors)

		if (Object.keys(validationErrors).length > 0) {
			toasty.error('Please fix the highlighted errors.')
			return
		}

		try {
			const dataToSend = {
				...inputsData,
				role: isBusinessRegister ? 1 : 2,
				cart: includeCart ? cart : [],
			}
			const { data, status } = await userRegistration(dataToSend)
			if (status === 201) {
				toasty.success(data.message)
				navigate('/account')
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

	const changeRole = (role: boolean) => {
		setError({})
		setIsBusinessRegister(role)
		reset()
	}

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
					onClick={() => changeRole(false)}
					className={`flex items-center px-4 py-2 rounded-md ${
						!isBusinessRegister ? 'bg-black text-white' : 'bg-gray-100'
					}`}
				>
					<User className='h-4 w-4 mr-2' />
					Client
				</button>
				<button
					type='button'
					onClick={() => changeRole(true)}
					className={`flex items-center px-4 py-2 rounded-md ${
						isBusinessRegister ? 'bg-black text-white' : 'bg-gray-100'
					}`}
				>
					<Building2 className='h-4 w-4 mr-2' />
					Business
				</button>
			</div>

			<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
				<div className='rounded-md shadow-sm space-y-4'>
					{isBusinessRegister ? (
						<>
							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Business Name
									<input
										{...register('businessName')}
										onInput={changeErrors}
										type='text'
										maxLength={20}
										className={`mt-1 block w-full px-3 py-2 shadow-sm border ${error.businessName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
									/>
								</label>
								{error.businessName && (
									<p className='mt-2 text-sm text-red-600'>{error.businessName}</p>
								)}
							</div>
						</>
					) : (
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700'>
									First Name
									<input
										{...register('firstName')}
										onInput={changeErrors}
										placeholder='First name'
										type='text'
										maxLength={20}
										className={`mt-1 block w-full px-3 py-2 shadow-sm border ${error.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
									/>
								</label>
								{error.firstName && <p className='mt-2 text-sm text-red-600'>{error.firstName}</p>}
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Last Name
									<input
										{...register('lastName')}
										onInput={changeErrors}
										placeholder='Last name'
										type='text'
										maxLength={20}
										className={`mt-1 block w-full px-3 py-2 shadow-sm border ${error.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
									/>
								</label>
								{error.lastName && <p className='mt-2 text-sm text-red-600'>{error.lastName}</p>}
							</div>
						</div>
					)}

					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Email address
							<input
								{...register('email')}
								onInput={changeErrors}
								className={`mt-1 block w-full px-3 py-2 shadow-sm border ${error.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
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
								placeholder='At least 8 characters'
								type='password'
								maxLength={20}
								className={`mt-1 block w-full px-3 py-2 shadow-sm border ${error.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
							/>
						</label>
						{error.password && <p className='mt-2 text-sm text-red-600'>{error.password}</p>}
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Confirm Password
							<input
								{...register('confirmPassword')}
								onInput={changeErrors}
								type='password'
								className={`mt-1 block w-full px-3 py-2 shadow-sm border ${error.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md`}
							/>
						</label>
						{error.confirmPassword && (
							<p className='mt-2 text-sm text-red-600'>{error.confirmPassword}</p>
						)}
					</div>
				</div>

				{cart && !isBusinessRegister && (
					<label className='flex gap-3 text-sm font-medium text-gray-700 pe-1'>
						<input checked={includeCart} onInput={() => setIncludeCart((prev) => !prev)} type='checkbox' className='' />
						You already have things in your cart, do you want to add them?
					</label>
				)}

				{isBusinessRegister && (
					<div className='text-sm text-gray-600'>
						By registering, you agree to our terms of service and seller agreement.
					</div>
				)}

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800'
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
