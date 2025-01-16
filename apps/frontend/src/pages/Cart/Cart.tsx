import { LocalStorage } from '@/shared/context/localstorage'
import { Order } from '@/shared/ui/Order'
import { useContext } from 'react'

export const Cart: React.FC = (): React.ReactNode => {
	const { cart } = useContext(LocalStorage.Context)
	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4'>Shopping Cart</h2>
			{cart && cart.map((p) => <Order key={p.id} {...p} />)}
			<div className='mt-6'>
				<div className='flex justify-between mb-2'>
					<p>Subtotal</p>
					<p>$29.99</p>
				</div>
				<div className='flex justify-between font-semibold'>
					<p>Total</p>
					<p>$34.99</p>
				</div>
			</div>
		</div>
	)
}
