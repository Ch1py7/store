import { useOrderFlowStore } from '@/shared/context/useOrderFlow'
import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

interface ShippingProps {
	register: UseFormRegister<CheckoutInputs>
	errors: FieldErrors<CheckoutInputs>
  handleSubmit: UseFormHandleSubmit<CheckoutInputs>
}

export const Shipping: React.FC<ShippingProps> = ({ errors, register, handleSubmit }): React.ReactNode => {
	const { setStep } = useOrderFlowStore()

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
									{...register('firstName')}
									type='text'
									className={'mt-1 block w-full px-3 py-2 shadow-sm border rounded-md'}
								/>
							</label>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Last Name
								<input
									{...register('lastName')}
									type='text'
									className={'mt-1 block w-full px-3 py-2 shadow-sm border rounded-md'}
								/>
							</label>
						</div>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Address
							<input
								{...register('address')}
								type='text'
								className={'mt-1 block w-full px-3 py-2 shadow-sm border rounded-md'}
							/>
						</label>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								City
								<input
									{...register('city')}
									type='text'
									className={'mt-1 block w-full px-3 py-2 shadow-sm border rounded-md'}
								/>
							</label>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Postal Code
								<input
									{...register('cp')}
									type='text'
									className={'mt-1 block w-full px-3 py-2 shadow-sm border rounded-md'}
								/>
							</label>
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
					onClick={() => setStep('confirmation')}
					className='w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 order-1 sm:order-2'
				>
					Continue
				</button>
			</div>
		</>
	)
}
