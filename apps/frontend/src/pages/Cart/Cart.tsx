import { LocalStorage } from '@/shared/context/localStorage'
import { Order } from '@/shared/ui/Order'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export const Cart: React.FC = (): React.ReactNode => {
	const { cart, total } = useContext(LocalStorage.Context)
  console.log(total)
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
						<Link
							to='/checkout'
							className={`mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 self-end ${total === 0 && 'pointer-events-none bg-disabled'}`}
						>
							Proceed to checkout
						</Link>
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
