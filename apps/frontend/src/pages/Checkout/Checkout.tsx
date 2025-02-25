import { useOrderFlowStore } from '@/shared/context/useOrderFlow'
import { useForm } from 'react-hook-form'
import { Payment } from './Payment'
import { Shipping } from './Shipping'

export const Checkout: React.FC = (): React.ReactNode => {
	const { step } = useOrderFlowStore()
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		setValue,
		watch,
		reset,
	} = useForm<CheckoutInputs>()
	return (
		<div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
			{step === 'payment' && <Payment errors={errors} register={register} handleSubmit={handleSubmit} />}
			{step === 'shipping' && <Shipping errors={errors} register={register} handleSubmit={handleSubmit} />}
		</div>
	)
}
