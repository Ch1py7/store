import { ClothingSizes } from '@/shared/utils'
import type {
	FieldErrors,
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form'

type Inputs = {
	name: string
	description: string
	percentageDiscount: number
	price: number
	size: number[]
	stock: number
	sizeToShow: number
}

interface NewClothingProps {
	register: UseFormRegister<Inputs>
	errors: FieldErrors<Inputs>
	sizes: number[]
	setSizes: React.Dispatch<React.SetStateAction<number[]>>
	clearErrors: UseFormClearErrors<Inputs>
	setValue: UseFormSetValue<Inputs>
}

const sizeOptions = [
	{ label: 'XS', value: ClothingSizes.XS },
	{ label: 'S', value: ClothingSizes.S },
	{ label: 'M', value: ClothingSizes.M },
	{ label: 'L', value: ClothingSizes.L },
	{ label: 'XL', value: ClothingSizes.XL },
	{ label: '2XL', value: ClothingSizes.XXL },
	{ label: '3XL', value: ClothingSizes.XXXL },
]

export const NewClothing: React.FC<NewClothingProps> = ({
	register,
	errors,
	sizes,
	setSizes,
	clearErrors,
	setValue,
}): React.ReactNode => {
	const handleSize = (value: number) => {
		clearErrors('size')
		if (!sizes.includes(value)) {
			setSizes((prevSizes) => {
				const newSizes = [...prevSizes, value]
				setValue('size', newSizes)
				return newSizes
			})
		} else {
			setSizes((prevSizes) => {
				const newSizes = prevSizes.filter((size) => size !== value)
				setValue('size', newSizes)
				return newSizes
			})
		}
	}
	return (
		<div className='space-y-4'>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Product Name
					<input
						type='text'
						{...register('name', {
							maxLength: {
								value: 100,
								message: 'Name must not exceed 100 characters',
							},
							minLength: {
								value: 1,
								message: 'Name must be greather than 1 character',
							},
							required: {
								value: true,
								message: 'Name is required',
							},
						})}
						className={`mt-1 block w-full px-3 py-2 shadow-sm border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
					/>
				</label>
				{errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
			</div>
			<div className='grid grid-cols-4 gap-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Price
						<input
							type='text'
							{...register('price', {
								required: 'Price is required',
								value: 0,
								valueAsNumber: true,
								max: {
									value: 1000000,
									message: 'Price must not exceed 7 digits',
								},
								min: {
									value: 1,
									message: 'Price must be greater than 0',
								},
							})}
							onInput={(e) => {
								e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
							}}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{errors.price && <p className='text-red-500 text-sm'>{errors.price.message}</p>}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Stock
						<input
							type='text'
							{...register('stock', {
								required: 'Stock is required',
								value: 0,
								valueAsNumber: true,
								max: {
									value: 1000000,
									message: 'Price must not exceed 7 digits',
								},
								min: {
									value: 1,
									message: 'Stock must be greater than 0',
								},
							})}
							onInput={(e) => {
								e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
							}}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{errors.stock && <p className='text-red-500 text-sm'>{errors.stock.message}</p>}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Discount %
						<input
							{...register('percentageDiscount', {
								required: 'Discount is required',
								value: 0,
								valueAsNumber: true,
								min: {
									value: 0,
									message: 'Percentage must be 0 or greater',
								},
								max: {
									value: 100,
									message: 'Discount must not exceed 100%',
								},
							})}
							onInput={(e) => {
								e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
							}}
							onChange={(e) => {
								if (Number.parseInt(e.target.value, 10) > 100) {
									e.target.value = '100'
								}
							}}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${errors.percentageDiscount ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{errors.percentageDiscount && (
						<p className='text-red-500 text-sm'>{errors.percentageDiscount.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Sizes
						<select
							onChange={(e) => {
								handleSize(Number(e.target.value))
							}}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${errors.size ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						>
							<option value=''>Select sizes</option>
							{sizeOptions.map((size) => {
								if (sizes.find((s) => s === size.value)) return
								return (
									<option key={size.value} value={size.value}>
										{size.label}
									</option>
								)
							})}
						</select>
					</label>
					<div className='mt-2 grid grid-cols-3 gap-2'>
						{sizes.map((size) => {
							const sizeLabel = sizeOptions.find((s) => s.value === size)?.label
							return (
								<button
									key={size}
									type='button'
									onClick={() => handleSize(size)}
									className='bg-gray-200 rounded-lg hover:bg-red-400 transition-colors duration-300 ease-in-out '
									title='remove'
								>
									{sizeLabel}
								</button>
							)
						})}
					</div>
					{errors.size && <p className='text-red-500 text-sm'>{errors.size.message}</p>}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Size to show
						<select
							{...register('sizeToShow', { valueAsNumber: true })}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${errors.size ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						>
							<option value=''>Select a size</option>
							{sizes.map((size) => (
								<option key={size} value={sizeOptions.find((s) => s.value === size)?.value}>
									{sizeOptions.find((s) => s.value === size)?.label}
								</option>
							))}
						</select>
					</label>
					{errors.size && <p className='text-red-500 text-sm'>{errors.size.message}</p>}
				</div>
			</div>
			<div>
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					Description
					<textarea
						{...register('description', {
							required: 'Description is required',
							maxLength: {
								value: 200,
								message: 'Description must be a maximum of 200 characters',
							},
							minLength: {
								value: 10,
								message: 'Description must be 10 characters or greater',
							},
						})}
						placeholder='10 characters minimum'
						className={`mt-1 block w-full min-h-32 px-3 py-2 shadow-sm border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						style={{ resize: 'none' }}
					/>
				</label>
				{errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
			</div>
		</div>
	)
}
