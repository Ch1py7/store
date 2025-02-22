import { toasty } from '@/shared/lib/notifications/toast'
import { ProductsService } from '@/shared/service/requests/products'
import { patchRequest, postRequest } from '@/shared/service/requests/requests'
import { Modal } from '@/shared/ui/Modal'
import { attributesParser, ProductsCategories } from '@/shared/utils'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Clothing } from './Clothing'
import { Technology } from './Technology'

interface Product {
	id: string
	name: string
	description: string
	updatedAt: number
	createdAt: number
	price: number
	category: number
	stock: number
	attributes: {
		attribute_name: string
		attribute_value: string
	}[]
}

interface CreateProductProps {
	showCreateProduct: boolean
	setShowCreateProduct: React.Dispatch<React.SetStateAction<boolean>>
	productToEdit: Product | null
	setProductToEdit: React.Dispatch<React.SetStateAction<Product | null>>
	getProducts: () => Promise<void>
}

type Category = {
	label: string
	value: number
	type: string
}

const ProductCategory: Category[] = [
	{ label: 'Clothing', value: ProductsCategories.Clothing, type: 'CLOTHING' },
	{ label: 'Technology', value: ProductsCategories.Technology, type: 'TECH' },
	// { label: 'Reading', value: ProductsCategories.Reading, type: 'READ' },
	// { label: 'Home & Kitchen', value: ProductsCategories.HomeAndKitchen, type: 'H&C' },
	// { label: 'Health & Beauty', value: ProductsCategories.HealthAndBeauty, type: 'H&B' },
	// { label: 'Toys & Games', value: ProductsCategories.ToysAndGames, type: 'T&G' },
]

export const CreateOrEditProduct: React.FC<CreateProductProps> = ({
	setShowCreateProduct,
	showCreateProduct,
	productToEdit,
	setProductToEdit,
	getProducts,
}): React.ReactNode => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		setValue,
		watch,
		reset,
	} = useForm<GeneralInputs>()

	const selectedCategory = watch('category')

	const handleShowModal = () => {
		setShowCreateProduct(false)
		setProductToEdit(null)
		reset({ category: 0 })
	}

	const onSubmit: SubmitHandler<GeneralInputs> = async (inputsData) => {
		try {
			const dataToSend = { ...inputsData, attributes: attributesParser(inputsData.attributes) }
			const { response, status } = productToEdit
				? await patchRequest<{ message: string }>(
						ProductsService.update(productToEdit.id),
						dataToSend
					)
				: await postRequest<{ message: string }>(ProductsService.create, dataToSend)
			if (status === 200) {
				toasty.success(response.message)
				handleShowModal()
				getProducts()
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
		if (productToEdit) {
			setValue('name', productToEdit.name)
			setValue('description', productToEdit.description)
			setValue('price', productToEdit.price)
			setValue('category', productToEdit.category)
			setValue('stock', productToEdit.stock)
			productToEdit.attributes.forEach((attribute) => {
				// @ts-ignore
				setValue(`attributes.${attribute.attribute_name}`, attribute.attribute_value)
			})
		}
	}, [productToEdit, setValue])

	useEffect(() => {
		if (!showCreateProduct) {
			clearErrors()
			reset({ category: 0 })
		}
	}, [showCreateProduct, clearErrors, reset])

	return (
		<Modal
			showModal={showCreateProduct || Boolean(productToEdit)}
			setShowModal={() => handleShowModal()}
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
									disabled: Boolean(productToEdit),
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
					{selectedCategory !== 0 && (
						<>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Product Name
									<input
										placeholder='Super Product'
										type='text'
										{...register('name', {
											maxLength: {
												value: 100,
												message: 'Name must not exceed 100 characters',
											},
											minLength: {
												value: 2,
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
							<div className='mt-2 grid grid-cols-2 gap-2'>
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
							</div>
						</>
					)}
					{selectedCategory === ProductsCategories.Clothing && (
						<Clothing errors={errors} register={register} />
					)}
					{selectedCategory === ProductsCategories.Technology && (
						<Technology errors={errors} register={register} />
					)}

					{/* {selectedCategory === 3 && (
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
					)} */}
					{selectedCategory !== 0 && (
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
									})}
									placeholder='You will never feel cold again.'
									className={`mt-1 block w-full min-h-32 px-3 py-2 shadow-sm border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
									style={{ resize: 'none' }}
								/>
							</label>
							{errors.description && (
								<p className='text-red-500 text-sm'>{errors.description.message}</p>
							)}
						</div>
					)}

					<div className='flex justify-end space-x-3'>
						<button
							type='button'
							onClick={() => handleShowModal()}
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
