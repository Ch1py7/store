import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

interface TechnologyProps {
	register: UseFormRegister<GeneralInputs<'TECH'>>
	errors: FieldErrors<GeneralInputs<'TECH'>>
}

export const Technology: React.FC<TechnologyProps> = ({ register, errors }): React.ReactNode => {
	const [showDetails, setShowDetails] = useState(false)
	const [showConnectivity, setShowConnectivity] = useState(false)
	const [showBattery, setShowBattery] = useState(false)
	const clothingErrors = errors.attributes as FieldErrors<TechInputs> | undefined

	return (
		<div className='space-y-4'>
			<button
				type='button'
				onClick={() => setShowDetails((prev) => !prev)}
				className='flex justify-between w-full border-y border-solid border-gray-300 py-2 font-bold'
			>
				Product Details
				{showDetails ? <ChevronUp /> : <ChevronDown />}
			</button>
			<div className={`${showDetails ? 'grid' : 'hidden'} grid-cols-3 gap-4`}>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Brand
						<input
							placeholder='Xiaomi'
							{...register('attributes.brand')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.brand ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.brand && (
						<p className='text-red-500 text-sm'>{clothingErrors?.brand.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Model Number
						<input
							placeholder='MZB0FFWEU'
							{...register('attributes.model')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.model ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.model && (
						<p className='text-red-500 text-sm'>{clothingErrors?.model.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Model Name
						<input
							placeholder='Note 13 pro 5g'
							{...register('attributes.modelName')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.modelName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.modelName && (
						<p className='text-red-500 text-sm'>{clothingErrors?.modelName.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Model Year
						<input
							placeholder='Note 13 pro 5g'
							{...register('attributes.modelYear')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.modelYear ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.modelYear && (
						<p className='text-red-500 text-sm'>{clothingErrors?.modelYear.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Built-In Media
						<input
							placeholder='Fast Car charger, USB Cable'
							{...register('attributes.builtInMedia')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.builtInMedia ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.builtInMedia && (
						<p className='text-red-500 text-sm'>{clothingErrors?.builtInMedia.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Manufacturer
						<input
							placeholder='Xiaomi'
							{...register('attributes.manufacturer')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.manufacturer ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.manufacturer && (
						<p className='text-red-500 text-sm'>{clothingErrors?.manufacturer.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Model Serie
						<input
							placeholder='Note 13'
							{...register('attributes.serie')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.serie ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.serie && (
						<p className='text-red-500 text-sm'>{clothingErrors?.serie.message}</p>
					)}
				</div>
			</div>
			<button
				type='button'
				onClick={() => setShowConnectivity((prev) => !prev)}
				className='flex justify-between w-full border-y border-solid border-gray-300 py-2 font-bold'
			>
				Connectivity
				{showConnectivity ? <ChevronUp /> : <ChevronDown />}
			</button>
			<div className={`${showConnectivity ? 'grid' : 'hidden'} grid-cols-3 gap-4`}>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Wireless Provider
						<input
							placeholder='Unlocked'
							{...register('attributes.wirelessProvider')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.wirelessProvider ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.wirelessProvider && (
						<p className='text-red-500 text-sm'>{clothingErrors?.wirelessProvider.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Cellular Technology
						<input
							placeholder='5G'
							{...register('attributes.cellularTechnology')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.cellularTechnology ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.cellularTechnology && (
						<p className='text-red-500 text-sm'>{clothingErrors?.cellularTechnology.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Connectivity Technology
						<input
							placeholder='Wireless'
							{...register('attributes.connectivityTechnology')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.connectivityTechnology ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.connectivityTechnology && (
						<p className='text-red-500 text-sm'>{clothingErrors?.connectivityTechnology.message}</p>
					)}
				</div>
			</div>
			<button
				type='button'
				onClick={() => setShowBattery((prev) => !prev)}
				className='flex justify-between w-full border-y border-solid border-gray-300 py-2 font-bold'
			>
				Battery
				{showBattery ? <ChevronUp /> : <ChevronDown />}
			</button>
			<div className={`${showBattery ? 'grid' : 'hidden'} grid-cols-3 gap-4`}>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Battery Type
						<input
							placeholder='Lithium-Polymer'
							{...register('attributes.batteryType')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.batteryType ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.batteryType && (
						<p className='text-red-500 text-sm'>{clothingErrors?.batteryType.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Battery Power
						<input
							placeholder='5000 Milliamp Hours'
							{...register('attributes.batteryPower')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.batteryPower ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.batteryPower && (
						<p className='text-red-500 text-sm'>{clothingErrors?.batteryPower.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Battery Average Life
						<input
							placeholder='50 Hours'
							{...register('attributes.batteryLife')}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${clothingErrors?.batteryLife ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{clothingErrors?.batteryLife && (
						<p className='text-red-500 text-sm'>{clothingErrors?.batteryLife.message}</p>
					)}
				</div>
			</div>
		</div>
	)
}
