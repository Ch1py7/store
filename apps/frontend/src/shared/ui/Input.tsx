import { Search } from 'lucide-react'
import { useEffect } from 'react'

interface InputProps {
	inputRef?: React.RefObject<HTMLInputElement>
	onInput?: React.ChangeEventHandler<HTMLInputElement>
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	name?: string
	value?: string
	placeholder?: string
}

export const Input: React.FC<InputProps> = ({
	inputRef,
	name = 'search',
	onChange,
	onInput,
	placeholder,
	value,
}): React.ReactElement => {
	useEffect(() => {
		if (!inputRef) return
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
	}, [inputRef])
	return (
		<div className='w-full flex justify-center relative'>
			{name === 'search' && (
				<Search className='h-5 w-5 absolute left-5 top-[50%] transform -translate-x-1/2 -translate-y-1/2 traslate move text-gray-400' />
			)}
			<input
				ref={inputRef}
				placeholder={placeholder}
				onChange={onChange}
				onInput={onInput}
				value={value}
				type='text'
				name={name}
				className={`w-full py-1 border-2 rounded-lg text-ellipsis text-wrap focus:border-blue-400 focus:border-2 ${name === 'search' ? 'px-10' : 'px-3'}`}
			/>
			{name === 'search' && (
				<span className='hidden xxs:block absolute -right-5 top-[50%] transform -translate-x-1/2 -translate-y-1/2 traslate move text-gray-400'>
					CTRL + K
				</span>
			)}
		</div>
	)
}
