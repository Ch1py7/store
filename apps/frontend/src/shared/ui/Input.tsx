import { Search } from 'lucide-react'
import { useEffect, useRef } from 'react'

export const Input: React.FC = (): React.ReactNode => {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === '/') {
				event.preventDefault()
				inputRef.current?.focus()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])
	return (
		<div className='w-full flex justify-center relative max-w-7xl mx-4 sm:mx-10'>
			<Search className='h-5 w-5 absolute left-5 top-[50%] transform -translate-x-1/2 -translate-y-1/2 traslate move text-gray-400' />
			<input
				ref={inputRef}
				placeholder='Search product'
				type='text'
				name='search'
				className='w-full py-1 border border-solid border-gray-400 rounded-lg px-10 text-ellipsis text-wrap'
			/>
			<span className='hidden sm:block absolute -right-5 top-[50%] transform -translate-x-1/2 -translate-y-1/2 traslate move text-gray-400'>
				CTRL + K
			</span>
		</div>
	)
}
