import { X } from 'lucide-react'

interface ModalProps {
	showModal?: boolean
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
	title?: string
	children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
	showModal,
	setShowModal,
	title,
	children,
}): React.ReactNode | null => {
	document.body.style.overflowY = showModal ? 'hidden' : ''

	if (!showModal) return null
	return (
		<div className='fixed z-10 top-0 left-0 bottom-0 right-0 overflow-hidden bg-gray-500/75 backdrop-blur-[1px] flex justify-center items-center'>
			<div className='relative bg-white rounded-lg shadow-sm'>
				{title && (
					<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200'>
						<h3 className='text-xl font-semibold text-gray-900'>{title}</h3>
						<button
							type='button'
							className='end-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center'
							title='Close modal'
							onClick={() => setShowModal((prev) => !prev)}
						>
							<X className='text-gray-400' />
						</button>
					</div>
				)}
				<div className='p-4 md:p-5'>{children}</div>
				{!title && (
					<button
						type='button'
						className='absolute transform -translate-y-1/2 top-7 right-[14px] end-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center'
						title='Close modal'
						onClick={() => setShowModal((prev) => !prev)}
					>
						<X className='text-gray-400' />
					</button>
				)}
			</div>
		</div>
	)
}
