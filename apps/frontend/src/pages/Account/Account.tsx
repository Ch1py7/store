import { useAuthStore } from '@/shared/context/useAuthStore'
import { useCartStore } from '@/shared/context/useCartStore'
import { toasty } from '@/shared/lib/notifications/toast'
import { patchRequest } from '@/shared/service/requests/requests'
import { UserService } from '@/shared/service/requests/user'
import { UpdateUserValidations } from '@/shared/service/validations/update-user'
import { AxiosError } from 'axios'
import { ShoppingBag, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type Inputs = {
	firstName: string
	lastName: string
}

export const Account: React.FC = (): React.ReactNode => {
	const { user, isAuthenticated, checkAuth } = useAuthStore()
	const [error, setError] = useState<Record<string, string>>({})
	const { getProductsQuantity, loading: cartLoading } = useCartStore()
	const { register, handleSubmit, setValue, watch } = useForm<Inputs>({
		defaultValues: {
			firstName: user?.firstName,
			lastName: user?.email,
		},
	})

	const watchedValues = watch(['firstName', 'lastName'])

	const isDisabled = user
		? user.firstName === watchedValues[0] && user.lastName === watchedValues[1]
		: false

	const changeErrors = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError((prev) => {
			const newErrors = { ...prev }
			delete newErrors[e.target.name]
			return newErrors
		})
	}

	const onSubmit: SubmitHandler<Inputs> = async (inputsData) => {
		const validationErrors = new UpdateUserValidations(inputsData).validate()
		setError(validationErrors)

		if (Object.keys(validationErrors).length > 0) {
			toasty.error('Please fix the highlighted errors.')
			return
		}

		try {
			const dataToSend = { ...inputsData }
			const { response, status } = await patchRequest<{ message: string }>(
				UserService.update,
				dataToSend
			)
			if (status === 200) {
				toasty.success(response.message)
				checkAuth()
			}
		} catch (er) {
			if (er instanceof AxiosError && er.response?.data?.error) {
				toasty.error(er.response.data.error)
			} else {
				toasty.error('An unexpected error occurred. Please try again later.')
			}
		}
	}

	useEffect(() => {
		if (user) {
			setValue('firstName', user.firstName)
			setValue('lastName', user.lastName)
		}
	}, [user, setValue])

	return (
		<div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto'>
				<div className='bg-white shadow rounded-lg p-8'>
					{!cartLoading ? (
						<>
							<div className='flex items-center justify-center mb-8'>
								<div className='h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center'>
									{isAuthenticated() ? (
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
										<p className='text-2xl font-bold'>{getProductsQuantity()}</p>
									</Link>
								</div>
								<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
									<h3 className='text-lg font-semibold'>Personal Information</h3>
									<div className='grid grid-cols-1 xxs:grid-cols-2 gap-4'>
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
											{error.firstName && (
												<p className='mt-2 text-sm text-red-600'>{error.firstName}</p>
											)}
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
											{error.lastName && (
												<p className='mt-2 text-sm text-red-600'>{error.lastName}</p>
											)}
										</div>
										<div>
											<label className='block text-sm font-medium text-gray-700'>
												Email
												<input
													name='email'
													id='account-email'
													disabled
													placeholder='email'
													defaultValue={user?.email}
													className='mt-1 block w-full px-3 py-2 shadow-sm border border-gray-300 rounded-md text-disabled'
												/>
											</label>
										</div>
										{/* TODO: Add phone field in backend
										<div>
											<p className='block text-sm font-medium text-gray-700'>Phone</p>
											<input
												name='phone'
												id='account-phone'
												disabled
												placeholder='phone'
												defaultValue={user?.phone}
												className='mt-1 block w-full px-3 py-2 shadow-sm border border-gray-300 rounded-md text-disabled'
											/>
										</div> */}
									</div>
									<button
										type='submit'
										disabled={isDisabled}
										className={`w-full ${isDisabled ? 'bg-disabled' : 'bg-black hover:bg-gray-800'} mt-4 text-white py-2 rounded-md`}
									>
										Save Changes
									</button>
								</form>
							</div>
						</>
					) : (
						<div className='min-h-[200px] grid place-items-center'>
							<div className='loader' />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
