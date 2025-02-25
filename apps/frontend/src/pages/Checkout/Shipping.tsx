import { useOrderFlowStore } from '@/shared/context/useOrderFlow'
import valid from 'card-validator'
import type {
	FieldErrors,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormRegister,
} from 'react-hook-form'

interface ShippingProps {
	register: UseFormRegister<CheckoutInputs>
	errors: FieldErrors<CheckoutInputs>
	handleSubmit: UseFormHandleSubmit<CheckoutInputs>
}

export const Shipping: React.FC<ShippingProps> = ({
	errors,
	register,
	handleSubmit,
}): React.ReactNode => {
	const { setStep } = useOrderFlowStore()

	const onSubmit: SubmitHandler<CheckoutInputs> = () => {
		setStep('confirmation')
	}

	return (
		<>
			<div className='bg-white shadow rounded-lg p-4 sm:p-6 mb-6'>
				<h2 className='text-lg sm:text-xl font-semibold mb-4'>Shipping Information</h2>
				<div className='space-y-4'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								First Name
								<input
									{...register('firstName', {
										required: {
											message: 'First name is required',
											value: true,
										},
									})}
									type='text'
									className={`mt-1 block w-full px-3 py-2 shadow-sm border rounded-md ${errors?.firstName ? 'border-red-500' : 'border-gray-300'}`}
								/>
							</label>
							{errors?.firstName && (
								<p className='text-red-500 text-sm'>{errors?.firstName.message}</p>
							)}
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Last Name
								<input
									{...register('lastName', {
										required: {
											message: 'Last name is required',
											value: true,
										},
									})}
									type='text'
									className={`mt-1 block w-full px-3 py-2 shadow-sm border rounded-md ${errors?.lastName ? 'border-red-500' : 'border-gray-300'}`}
								/>
							</label>
							{errors?.lastName && (
								<p className='text-red-500 text-sm'>{errors?.lastName.message}</p>
							)}
						</div>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Address
							<input
								{...register('address', {
									required: {
										message: 'Your address is required',
										value: true,
									},
								})}
								type='text'
								className={`mt-1 block w-full px-3 py-2 shadow-sm border rounded-md ${errors?.address ? 'border-red-500' : 'border-gray-300'}`}
							/>
						</label>
						{errors?.address && <p className='text-red-500 text-sm'>{errors?.address.message}</p>}
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								City
								<input
									{...register('city', {
										required: {
											message: 'Your city is required',
											value: true,
										},
									})}
									type='text'
									className={`mt-1 block w-full px-3 py-2 shadow-sm border rounded-md ${errors?.city ? 'border-red-500' : 'border-gray-300'}`}
								/>
							</label>
							{errors?.city && <p className='text-red-500 text-sm'>{errors?.city.message}</p>}
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Postal Code
								<input
									{...register('cp', {
										required: {
											message: 'Postal code required',
											value: true,
										},
										validate: (value) => {
											const validation = valid.postalCode(value)
											if (!validation.isValid) {
												return 'Invalid postal code'
											}
											return true
										},
									})}
									type='text'
									className={`mt-1 block w-full px-3 py-2 shadow-sm border rounded-md ${errors?.cp ? 'border-red-500' : 'border-gray-300'}`}
								/>
							</label>
							{errors?.cp && <p className='text-red-500 text-sm'>{errors?.cp.message}</p>}
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-col sm:flex-row sm:justify-between gap-4'>
				<button
					type='button'
					onClick={() => setStep('payment')}
					className='w-full sm:w-auto px-6 py-2 border rounded-md hover:bg-gray-50 order-2 sm:order-1'
				>
					Back
				</button>
				<button
					type='button'
					onClick={handleSubmit(onSubmit)}
					className='w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 order-1 sm:order-2'
				>
					Continue
				</button>
			</div>
		</>
	)
}
