import { toasty } from '@/shared/lib/notifications/toast'
import { ProductsService } from '@/shared/service/requests/products'
import { deleteRequest, getRequest } from '@/shared/service/requests/requests'
import { Modal } from '@/shared/ui/Modal'
import { getCategory, validateCategory } from '@/shared/utils'
import { AxiosError } from 'axios'
import { AlertCircle, Edit, Plus, Search, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { CreateOrEditProduct } from './CreateOrEditProduct/CreateOrEditProduct'

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

const setStockStatus = (stock: number) => {
	if (stock >= 5) {
		return 'bg-green-100 text-green-800'
	}
	if (stock < 5 && stock >= 3) {
		return 'bg-yellow-100 text-yellow-800'
	}
	if (stock < 3 && stock > 0) {
		return 'bg-red-100 text-red-800'
	}
	if (stock === 0) {
		return 'bg-red-500 text-white'
	}
}

export const Inventory: React.FC = (): React.ReactNode => {
	const [productToEdit, setProductToEdit] = useState<Product | null>(null)
	const [productToDelete, setProductToDelete] = useState<string>('')
	const [showCreateProduct, setShowCreateProduct] = useState<boolean>(false)
	const [products, setProducts] = useState<Product[] | null>(null)
	const [query, setQuery] = useState<string>('')
	const [debouncedQuery, setDebouncedQuery] = useState<string>('')

	const getProducts = useCallback(async () => {
		const { response } = await getRequest<{ data: Product[] }>(
			ProductsService.get('', debouncedQuery)
		)
		setProducts(response.data)
	}, [debouncedQuery])

	const deleteProduct = useCallback(async () => {
		try {
			const { response, status } = await deleteRequest<{ message: string }>(
				ProductsService.update('asd')
			)

			if (status === 200) {
				toasty.success(response.message)
				setProductToDelete(productToDelete)
				getProducts()
			}
		} catch (er) {
			if (er instanceof AxiosError && er.response?.data?.error) {
				toasty.error(er.response.data.error)
			} else {
				toasty.error('An unexpected error occurred. Please try again later.')
			}
		}
	}, [getProducts, productToDelete])

	useEffect(() => {
		getProducts()
	}, [getProducts])

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query)
		}, 500) // Espera 500ms antes de actualizar

		return () => {
			clearTimeout(handler)
		}
	}, [query])

	// useEffect(() => {
	// 	if (debouncedQuery) {
	// 		axios.get(`/api/search?query=${debouncedQuery}`).then((response) => {
	// 			console.log(response.data)
	// 		})
	// 	}
	// }, [debouncedQuery])
	return (
		<>
			<CreateOrEditProduct
				productToEdit={productToEdit}
				setProductToEdit={setProductToEdit}
				showCreateProduct={showCreateProduct}
				setShowCreateProduct={setShowCreateProduct}
				getProducts={getProducts}
			/>
			<Modal
				showModal={Boolean(productToDelete)}
				setShowModal={() => setProductToDelete('')}
				title='Confirmation'
			>
				<div className='p-4 text-center'>
					<AlertCircle className='w-16 h-16 mx-auto text-gray-500' />
					<h3 className='mb-5 mt-3 text-lg font-normal text-black'>
						Are you sure you want to delete this product?
					</h3>
					<button
						type='button'
						className='text-white bg-red-700 hover:bg-red-500 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
						onClick={() => deleteProduct()}
					>
						Yes, I'm sure
					</button>
					<button
						type='button'
						className='py-2.5 px-5 ms-3 text-sm font-medium text-white bg-black rounded-lg border border-gray-200 hover:bg-gray-700'
						onClick={() => setProductToDelete('')}
					>
						No, cancel
					</button>
				</div>
			</Modal>
			<div className='space-y-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-bold'>Inventory Management</h1>
					<button
						type='button'
						onClick={() => setShowCreateProduct(true)}
						className='flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800'
					>
						<Plus className='h-5 w-5' />
						<span>Add Product</span>
					</button>
				</div>
				<div className='flex space-x-4 items-center'>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search products...'
							onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
								setQuery(validateCategory(e.target.value))
							}
							className='pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-black'
						/>
						<Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
					</div>
				</div>
				<div className='bg-white rounded-lg shadow-sm'>
					{products ? (
						<table className='min-w-full'>
							<thead>
								<tr className='border-b'>
									<th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>ID</th>
									<th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>Product</th>
									<th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>
										Category
									</th>
									<th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>Stock</th>
									<th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>Price</th>
									<th className='px-6 py-3 text-left text-sm font-medium text-gray-500'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr
										key={product.id}
										className={`border-b ${product.stock === 0 ? 'bg-red-100' : ''}`}
									>
										<td className='px-6 py-4'>
											<span>{product.id.split('-')[0]}</span>
										</td>
										<td className='px-6 py-4'>
											<div className='flex items-center space-x-3'>
												<span>{product.name}</span>
											</div>
										</td>
										<td className='px-6 py-4'>
											<div className='flex items-center space-x-3'>
												<span>{getCategory[product.category]}</span>
											</div>
										</td>
										<td className='px-6 py-4'>
											<span
												className={`px-2 py-1 ${setStockStatus(product.stock)} rounded-full text-sm table-cell min-w-10 text-center`}
											>
												{product.stock.toLocaleString('en-US')}
											</span>
										</td>
										<td className='px-6 py-4 font-bold'>
											${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
										</td>
										<td className='px-6 py-4'>
											<div className='flex space-x-2'>
												<button
													onClick={() => setProductToEdit(product)}
													type='button'
													className='p-1 hover:bg-gray-100 rounded'
												>
													<Edit className='h-4 w-4' />
												</button>
												<button
													type='button'
													onClick={() => setProductToDelete(product.id)}
													className='p-1 hover:bg-gray-100 rounded text-red-500'
												>
													<Trash2 className='h-4 w-4' />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className='min-h-[200px] grid place-items-center'>
							<div className='loader' />
						</div>
					)}
				</div>
			</div>
		</>
	)
}
