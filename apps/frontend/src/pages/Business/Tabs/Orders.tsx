import { Search } from 'lucide-react'

export const Orders: React.FC = (): React.ReactNode => {
	return (
		<>
			<div className='space-y-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-bold'>Orders</h1>
					<div className='flex space-x-4'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search orders...'
								className='pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-black'
							/>
							<Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
						</div>
					</div>
				</div>
				<div className='bg-white rounded-lg shadow-sm overflow-hidden'>
					<table className='min-w-full'>
						<thead>
							<tr className='bg-gray-50 border-b'>
								<th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>Order ID</th>
								<th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>Total</th>
								<th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>Status</th>
								<th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* {orders &&
								orders.map((order, index) => (
									<tr key={index} className="border-b">
										<td className="px-6 py-4">
											<span className="font-medium">{order.id.split('-')[0]}</span>
										</td>
										<td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
										<td className="px-6 py-4">
											<span
												className={`px-2 py-1 ${getStatus(order.status)?.theme} rounded-full text-sm`}
											>
												{getStatus(order.status)?.text}
											</span>
										</td>
										<td className="px-6 py-4">
											<button
												onClick={() =>
													setDetails({
														...order,
														products: JSON.parse(order.products),
													})
												}
												type="button"
												className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
											>
												View Details
											</button>
										</td>
									</tr>
								))} */}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}
