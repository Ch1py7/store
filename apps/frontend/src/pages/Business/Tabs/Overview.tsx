import { Clock, Package, Users } from 'lucide-react'

export const Overview: React.FC = (): React.ReactNode => {
	return (
		<div className='space-y-6'>
			<h1 className='text-2xl font-bold'>Business Overview</h1>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<div className='bg-white p-6 rounded-lg shadow-sm'>
					<div className='flex items-center'>
						<div className='p-2 bg-green-100 rounded-lg'>
							<Package className='h-6 w-6 text-green-600' />
						</div>
						<div className='ml-4'>
							<p className='text-sm text-gray-500'>Products</p>
							<p className='text-2xl font-semibold'>
								{/* {products.reduce((total, prod) => total + prod.stock, 0)} */}
							</p>
						</div>
					</div>
				</div>
				<div className='bg-white p-6 rounded-lg shadow-sm'>
					<div className='flex items-center'>
						<div className='p-2 bg-purple-100 rounded-lg'>
							<Clock className='h-6 w-6 text-purple-600' />
						</div>
						<div className='ml-4'>
							<p className='text-sm text-gray-500'>Orders</p>
							{/* <p className="text-2xl font-semibold">{orders.length}</p> */}
						</div>
					</div>
				</div>
				<div className='bg-white p-6 rounded-lg shadow-sm'>
					<div className='flex items-center'>
						<div className='p-2 bg-yellow-100 rounded-lg'>
							<Users className='h-6 w-6 text-yellow-600' />
						</div>
						<div className='ml-4'>
							<p className='text-sm text-gray-500'>Customers</p>
							{/* <p className="text-2xl font-semibold">{users.length}</p> */}
						</div>
					</div>
				</div>
			</div>
			<div className='grid gap-6'>
				<div className='bg-white p-6 rounded-lg shadow-sm'>
					<h2 className='text-lg font-semibold mb-4'>Recent Orders</h2>
					<div className='space-y-4'>
						{/* {orders.slice(0, 5).map((order) => (
							<div key={order.id} className="flex items-center justify-between border-b pb-4">
								<div>
									<p className="font-medium">Order {order.id.split('-')[0]}</p>
								</div>
								<span
									className={`px-3 py-1 ${getStatus(order.status)?.theme} rounded-full text-sm`}
								>
									{getStatus(order.status)?.text}
								</span>
							</div>
						))} */}
					</div>
				</div>
			</div>
		</div>
	)
}
