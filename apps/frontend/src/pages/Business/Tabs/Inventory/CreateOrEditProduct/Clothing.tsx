import { ClothingSizes } from '@/shared/utils'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

interface ClothingProps {
	register: UseFormRegister<GeneralInputs<'CLOTHING'>>
	errors: FieldErrors<GeneralInputs<'CLOTHING'>>
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

export const Clothing: React.FC<ClothingProps> = ({ register, errors }): React.ReactNode => {
	const clothingErrors = errors.attributes as FieldErrors<ClothingInputs> | undefined

	return (
		<div className='space-y-4'>
			<div className='grid grid-cols-4 gap-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Size
						<select
							{...register('attributes.size', {
								valueAsNumber: true,
								required: {
									value: true,
									message: 'A size is required',
								},
							})}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.size ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						>
							<option value=''>Select size</option>
							{sizeOptions.map((size) => (
								<option key={size.value} value={size.value}>
									{size.label}
								</option>
							))}
						</select>
					</label>
					{clothingErrors?.size && (
						<p className='text-red-500 text-sm'>{clothingErrors?.size.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Gender
						<input
							placeholder='Unisex'
							{...register('attributes.gender')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.gender ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.gender && (
						<p className='text-red-500 text-sm'>{clothingErrors?.gender.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Color
						<input
							placeholder='Red'
							{...register('attributes.color', {
								required: {
									value: true,
									message: 'A color is required',
								},
							})}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.color ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.color && (
						<p className='text-red-500 text-sm'>{clothingErrors?.color.message}</p>
					)}
				</div>
				<div>
					<p className='block text-sm font-medium text-gray-700 mb-1'>Color Map</p>
					<input
						{...register('attributes.colorMap', {
							required: {
								value: true,
								message: 'Select a color to show',
							},
						})}
						type='color'
						className={`block mt-1 shadow-sm border h-[2.4rem] w-[4.8rem] px-[4px] py-[1px] ${clothingErrors?.colorMap ? 'border-red-500' : 'border-gray-300'} rounded-md`}
					/>
					{clothingErrors?.colorMap && (
						<p className='text-red-500 text-sm'>{clothingErrors?.colorMap.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Season
						<input
							placeholder='Winter'
							{...register('attributes.season')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.season ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.season && (
						<p className='text-red-500 text-sm'>{clothingErrors?.season.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Style
						<input
							placeholder='Casual'
							{...register('attributes.style')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.style ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.style && (
						<p className='text-red-500 text-sm'>{clothingErrors?.style.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Material
						<input
							placeholder='65% Polyester, 35% Cotton'
							{...register('attributes.material')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.material ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.material && (
						<p className='text-red-500 text-sm'>{clothingErrors?.material.message}</p>
					)}
				</div>
			</div>
		</div>
	)
}
