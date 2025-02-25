import { useOrderFlowStore } from '@/shared/context/useOrderFlow'
import valid from 'card-validator'
import type {
	FieldErrors,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormRegister,
} from 'react-hook-form'

interface PaymentProps {
	register: UseFormRegister<CheckoutInputs>
	errors: FieldErrors<CheckoutInputs>
	handleSubmit: UseFormHandleSubmit<CheckoutInputs>
}

export const Payment: React.FC<PaymentProps> = ({
	errors,
	register,
	handleSubmit,
}): React.ReactNode => {
	const { setStep } = useOrderFlowStore()

	const onSubmit: SubmitHandler<CheckoutInputs> = () => {
		setStep('shipping')
	}

	return (
		<>
			<form className='bg-white shadow rounded-lg p-4 sm:p-6 mb-6'>
				<h2 className='text-lg sm:text-xl font-semibold mb-4'>Payment Details</h2>
				<div className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Card Number
							<input
								{...register('cardNumber', {
									required: {
										message: 'Card number is required',
										value: true,
									},
									validate: (value) => {
										const validation = valid.number(value)
										if (!validation.isValid) {
											return 'Invalid number card'
										}
										return true
									},
								})}
								className={`mt-1 block w-full px-3 py-2 shadow-sm border rounded-md ${errors?.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
							/>
						</label>
						{errors?.cardNumber && (
							<p className='text-red-500 text-sm'>{errors?.cardNumber.message}</p>
						)}
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Expiry Date
								<input
									{...register('expDate', {
										required: {
											message: 'Expiration date is required',
											value: true,
										},
										validate: (value) => {
											const [month, year] = value.split('/')
											const isValidMonth = valid.expirationMonth(month)
											const isValidYear = valid.expirationYear(year)
											if (!isValidMonth.isValid || !isValidYear.isValid) {
												return 'Invalid expiration date'
											}
											return true
										},
									})}
									type='text'
									placeholder='MM/YY'
									className={`mt-1 block w-full px-3 py-2 shadow-sm border rounded-md ${errors?.expDate ? 'border-red-500' : 'border-gray-300'}`}
								/>
							</label>
							{errors?.expDate && <p className='text-red-500 text-sm'>{errors?.expDate.message}</p>}
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								CVV
								<input
									{...register('cvv', {
										required: {
											message: 'CVV is required',
											value: true,
										},
										validate: (value) => {
											const validation = valid.cvv(value)
											if (!validation.isValid) {
												return 'Invalid CVV'
											}
											return true
										},
									})}
									type='text'
									className={`mt-1 block w-full px-3 py-2 shadow-sm border rounded-md ${errors?.cvv ? 'border-red-500' : 'border-gray-300'}`}
								/>
							</label>
							{errors?.cvv && <p className='text-red-500 text-sm'>{errors?.cvv.message}</p>}
						</div>
					</div>
				</div>
			</form>
			<button
				type='submit'
				onClick={handleSubmit(onSubmit)}
				className='w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 order-1 sm:order-2'
			>
				Continue
			</button>
		</>
	)
}
