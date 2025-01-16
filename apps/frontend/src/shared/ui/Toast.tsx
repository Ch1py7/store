import { BadgeCheck, CircleAlert, Info, TriangleAlert } from 'lucide-react'
import { Slide, ToastContainer } from 'react-toastify'

export const Toast: React.FC = (): React.ReactNode => {
	return (
		<ToastContainer
			position='bottom-right'
			autoClose={3000}
			closeOnClick
			transition={Slide}
			icon={({ type }) => {
				switch (type) {
					case 'info':
						return <Info className='stroke-indigo-400' />
					case 'error':
						return <CircleAlert className='stroke-red-500' />
					case 'success':
						return <BadgeCheck className='stroke-green-500' />
					case 'warning':
						return <TriangleAlert className='stroke-yellow-500' />
					default:
						return null
				}
			}}
		/>
	)
}
