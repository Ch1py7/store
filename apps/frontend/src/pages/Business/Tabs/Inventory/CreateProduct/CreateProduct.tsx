import { toasty } from '@/shared/lib/notifications/toast'
import { ProductsService } from '@/shared/service/requests/products'
import { postRequest } from '@/shared/service/requests/requests'
import { Modal } from '@/shared/ui/Modal'
import { ProductsCategories } from '@/shared/utils'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { NewClothing } from './NewClothing'

interface CreateProductProps {
	showCreateProduct: boolean
	setShowCreateProduct: React.Dispatch<React.SetStateAction<boolean>>
	productToEdit: boolean | null
	setProductToEdit: React.Dispatch<React.SetStateAction<boolean | null>>
}

type Category = {
	label: string
	value: number
}

const ProductCategory: Category[] = [
	{ label: 'Clothing', value: ProductsCategories.Clothing },
	// { label: 'Technology', value: ProductsCategories.Technology },
	// { label: 'Reading', value: ProductsCategories.Reading },
	// { label: 'Home & Kitchen', value: ProductsCategories.HomeAndKitchen },
	// { label: 'Health & Beauty', value: ProductsCategories.HealthAndBeauty },
	// { label: 'Toys & Games', value: ProductsCategories.ToysAndGames },
]

type Inputs = {
	pages?: number
	category?: number
	// clothing
	name: string
	description: string
	percentageDiscount: number
	price: number
	size: number[]
	stock: number
	sizeToShow: number
}

export const CreateProduct: React.FC<CreateProductProps> = ({
	setShowCreateProduct,
	showCreateProduct,
	productToEdit,
	setProductToEdit,
}): React.ReactNode => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		watch,
		setError,
		setValue,
		reset,
		getValues,
	} = useForm<Inputs>()

	const [sizes, setSizes] = useState<number[]>([])
	const selectedCategory = watch('category')

	const onSubmit: SubmitHandler<Inputs> = async (inputsData) => {
		try {
			if (!sizes || sizes.length === 0) {
				setError('size', { type: 'required', message: 'A size is required' })
				return
			}
			const dataToSend = { ...inputsData, size: sizes }
			const { data, status } = await postRequest<{ message: string }>(
				ProductsService.create,
				dataToSend
			)
			if (status === 200) {
				toasty.success(data.message)
				setShowCreateProduct(false)
			}
		} catch (er) {
			if (er instanceof AxiosError && er.response?.data?.error) {
				toasty.error(er.response.data.error)
			} else {
				toasty.error('An unexpected error occurred. Please try again later.')
			}
		}
	}

	useEffect(() => {
		if (!showCreateProduct) {
			clearErrors()
			reset({ category: 0 })
		}
	}, [showCreateProduct, clearErrors, reset])

	return (
		<Modal
			showModal={showCreateProduct}
			setShowModal={setShowCreateProduct}
			title={productToEdit ? 'Edit Product' : 'Add New Product'}
			size='medium'
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Category
							<select
								{...register('category', {
									valueAsNumber: true,
									required: 'Category is required',
									min: {
										value: 1,
										message: 'Category is required',
									},
									onChange: (e) => {
										const selectedCategory = Number(e.target.value)
										reset({ category: selectedCategory })
									},
								})}
								className={`mt-1 block w-full px-3 py-2 shadow-sm border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md`}
							>
								<option value='0'>Select a category</option>
								{ProductCategory.map((category) => (
									<option key={category.value} value={category.value}>
										{category.label}
									</option>
								))}
							</select>
						</label>
						{errors.category && <p className='text-red-500 text-sm'>{errors.category.message}</p>}
					</div>
					{selectedCategory === ProductsCategories.Clothing && (
						<NewClothing
							errors={errors}
							register={register}
							setSizes={setSizes}
							sizes={sizes}
							clearErrors={clearErrors}
							setValue={setValue}
						/>
					)}

					{selectedCategory === 3 && (
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Number of Pages
								<input
									type='number'
									{...register('pages', {
										required: 'Number of pages is required',
										min: { value: 1, message: 'Must be at least 1 page' },
									})}
									className={`mt-1 block w-full px-3 py-2 shadow-sm border ${errors.pages ? 'border-red-500' : 'border-gray-300'} rounded-md`}
								/>
							</label>
							{errors.pages && <p className='text-red-500 text-sm'>{errors.pages.message}</p>}
						</div>
					)}

					<div className='flex justify-end space-x-3'>
						<button
							type='button'
							onClick={() => {
								setShowCreateProduct(false)
								setProductToEdit(null)
							}}
							className='px-4 py-2 border rounded-lg hover:bg-gray-50'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800'
						>
							{`${productToEdit ? 'Edit Product' : 'Add Product'}`}
						</button>
					</div>
				</div>
			</form>
		</Modal>
	)
}
