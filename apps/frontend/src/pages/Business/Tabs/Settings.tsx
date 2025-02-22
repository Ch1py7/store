import { useAuthStore } from '@/shared/context/useAuthStore'
import { toasty } from '@/shared/lib/notifications/toast'
import { patchRequest } from '@/shared/service/requests/requests'
import { UserService } from '@/shared/service/requests/user'
import { AxiosError } from 'axios'
import { User } from 'lucide-react'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
	firstName: string
	lastName: string
	email: string
}

export const Settings: React.FC = (): React.ReactNode => {
	const { user, checkAuth } = useAuthStore()
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		setValue,
		watch,
		reset,
	} = useForm<Inputs>()

	const watchedValues = watch(['firstName', 'lastName'])

	const isDisabled = user
		? user.firstName === watchedValues[0] && user.lastName === watchedValues[1]
		: false

	const onSubmit: SubmitHandler<Inputs> = async (inputsData) => {
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
			setValue('email', user.email)
		}
	}, [user, setValue])

	return (
		<div className='space-y-6'>
			<div className='bg-white rounded-lg shadow p-6'>
				<div className='flex items-center space-x-4 mb-6'>
					<div className='h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center'>
						<User className='h-10 w-10 text-gray-400' />
					</div>
					<div>
						<h2 className='text-xl font-semibold'>{user?.firstName}</h2>
						<p className='text-gray-500'>Administrator</p>
					</div>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							First Name
							<input
								{...register('firstName', {
									value: user?.firstName,
									maxLength: {
										value: 20,
										message: 'Max. 20 characters',
									},
									required: {
										value: true,
										message: 'First name is required',
									},
								})}
								placeholder={user?.firstName}
								type='text'
								className={`mt-1 block w-full px-3 py-2 shadow-sm border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
							/>
						</label>
						{errors.firstName && (
							<p className='mt-2 text-sm text-red-600'>{errors.firstName.message}</p>
						)}
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Last Name
							<input
								{...register('lastName', {
									value: user?.lastName,
									maxLength: {
										value: 20,
										message: 'Max. 20 characters',
									},
									required: {
										value: true,
										message: 'Last name is required',
									},
								})}
								placeholder={user?.lastName}
								type='text'
								maxLength={20}
								className={`mt-1 block w-full px-3 py-2 shadow-sm border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
							/>
						</label>
						{errors.lastName && (
							<p className='mt-2 text-sm text-red-600'>{errors.lastName.message}</p>
						)}
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Email
							<input
								{...register('email', {
									value: user?.email,
									required: {
										value: true,
										message: 'Email is required',
									},
									disabled: true,
								})}
								className='w-full p-2 border rounded-md'
							/>
						</label>
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
		</div>
	)
}
