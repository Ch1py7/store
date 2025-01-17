import { LocalStorage } from '@/shared/context/localStorage'
import { Order } from '@/shared/ui/Order'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const Wishlist: React.FC = (): React.ReactNode => {
	const { favorites } = useContext(LocalStorage.Context)
	const noProductsToBuy = 'Select at least 1 product to checkout.'
	const navigate = useNavigate()
	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			{favorites.length > 0 ? (
				<>
					<h2 className='text-xl font-semibold mb-4'>Wishlist</h2>
					{favorites.map((p) => (
						<Order key={p.id} {...p} />
					))}
				</>
			) : (
				<>
					<h2 className='text-xl font-semibold mb-4'>Your Wishlist is empty</h2>
					<p>You can try to fill it with clothing, groceries, and more.</p>
					<p>Thats why there is a Wishlist here.</p>
				</>
			)}
		</div>
	)
}
