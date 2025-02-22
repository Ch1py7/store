import { Clock, Package, ShoppingBag, Users } from 'lucide-react'
import { useState } from 'react'
import { Inventory } from './Tabs/Inventory/Inventory'
import { Orders } from './Tabs/Orders'
import { Overview } from './Tabs/Overview'
import { Settings } from './Tabs/Settings'

export const Business: React.FC = (): React.ReactNode => {
	const [activeTab, setActiveTab] = useState('overview')
	return (
		<>
			<div className='min-h-screen bg-gray-50'>
				<div className='fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 p-4'>
					<div className='space-y-2'>
						<button
							type='button'
							onClick={() => setActiveTab('overview')}
							className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
								activeTab === 'overview' ? 'bg-black text-white' : 'hover:bg-gray-100'
							}`}
						>
							<ShoppingBag className='h-5 w-5' />
							<span>Overview</span>
						</button>
						<button
							type='button'
							onClick={() => setActiveTab('inventory')}
							className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
								activeTab === 'inventory' ? 'bg-black text-white' : 'hover:bg-gray-100'
							}`}
						>
							<Package className='h-5 w-5' />
							<span>Inventory</span>
						</button>
						<button
							type='button'
							onClick={() => setActiveTab('orders')}
							className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
								activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-100'
							}`}
						>
							<Clock className='h-5 w-5' />
							<span>Orders</span>
						</button>
						<button
							type='button'
							onClick={() => setActiveTab('settings')}
							className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
								activeTab === 'settings' ? 'bg-black text-white' : 'hover:bg-gray-100'
							}`}
						>
							<Users className='h-5 w-5' />
							<span>Settings</span>
						</button>
					</div>
				</div>
				<div className='ml-64 p-8'>
					{activeTab === 'overview' && <Overview />}
					{activeTab === 'inventory' && <Inventory />}
					{activeTab === 'settings' && <Settings />}
					{activeTab === 'orders' && <Orders />}
				</div>
			</div>
		</>
	)
}
