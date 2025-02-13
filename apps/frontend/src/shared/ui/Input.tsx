import { Search } from 'lucide-react'
import { useEffect } from 'react'

interface InputProps {
	id?: string
	inputRef?: React.RefObject<HTMLInputElement>
	onInput?: React.ChangeEventHandler<HTMLInputElement>
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	name?: string
	value?: string
	placeholder?: string
	disabled?: boolean
}

export const Input: React.FC<InputProps> = ({
	id,
	inputRef,
	name = 'search',
	onChange,
	onInput,
	placeholder,
	value,
	disabled,
}): React.ReactElement => {
	if (id) {
		const input = document.getElementById(id) as HTMLInputElement
		if (input) input.disabled = Boolean(disabled)
	}

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
				<Search className='h-5 w-5 absolute left-5 top-[50%] transform -translate-x-1/2 -translate-y-1/2 traslate move text-disabled' />
			)}
			<input
				id={id}
				ref={inputRef}
				placeholder={placeholder}
				onChange={onChange}
				onInput={onInput}
				value={value}
				type='text'
				name={name}
				className={`w-full py-1 border-2 rounded-lg text-ellipsis text-wrap ${name === 'search' ? 'ps-10 pe-5 xxs:pe-20' : 'px-3'} ${disabled && 'text-disabled'}`}
			/>
			{name === 'search' && (
				<span className='hidden xxs:block absolute -right-5 top-[50%] transform -translate-x-1/2 -translate-y-1/2 traslate move text-disabled'>
					CTRL + K
				</span>
			)}
		</div>
	)
}
