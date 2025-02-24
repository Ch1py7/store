import { useAuthStore } from '@/shared/context/useAuthStore'
import { useCartStore } from '@/shared/context/useCartStore'
import { toasty } from '@/shared/lib/notifications/toast'
import { Order } from '@/shared/ui/Order'
import { useNavigate } from 'react-router-dom'

export const Cart: React.FC = (): React.ReactNode => {
	const { cart, total } = useCartStore()
	const { user } = useAuthStore()
	const noProductsToBuy = user ? 'Select at least 1 product to checkout.' : 'Please log in to your account before making a purchase'
	const navigate = useNavigate()

	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			{cart.length > 0 ? (
				<>
					<h2 className='text-xl font-semibold mb-4'>Shopping Cart</h2>
					{cart.map((p) => (
						<Order key={p.id} {...p} />
					))}
					<div className='mt-6 flex flex-col'>
						<div className='flex justify-between font-semibold'>
							<p>Total</p>
							<p>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
						</div>
						<button
							type='button'
							onClick={() => (total === 0 ? toasty.error(noProductsToBuy) : navigate('/checkout'))}
							className={`mt-4 bg-black text-white px-4 py-2 rounded-md self-end ${total === 0 ? 'bg-disabled' : 'hover:bg-gray-800'} shadow-md`}
						>
							Proceed to checkout
						</button>
					</div>
				</>
			) : (
				<>
					<h2 className='text-xl font-semibold mb-4'>Your Cart is empty</h2>
					<p>You can try to fill it with clothing, groceries, and more.</p>
					<p>Thats why there is a Cart here.</p>
				</>
			)}
		</div>
	)
}
