import { CreateCommand } from '@/application/product/create/command'
import { DeleteCommand } from '@/application/product/delete/command'
import { GetProductsCommand } from '@/application/product/get_products/command'
import { UpdateCommand } from '@/application/product/update/command'
import { container } from '@/container'
import express, { type Router } from 'express'
import { authorization } from './middlewares/authorizationMiddleware'

export const router: Router = express.Router()

router.post('/products/', authorization, async (req: express.Request, res: express.Response) => {
	const { name, description, price, stock, category, attributes } = req.body

	if (!name || !description || !price || !stock || !category || !attributes) {
		res.status(400).json({
			error: 'Missing required fields: name, description, price, stock, category, attributes',
		})
		return
	}

	try {
		const command = new CreateCommand({
			name,
			description,
			price,
			stock,
			category,
			attributes,
		})
		const createProduct = container.resolve('createProduct')
		const response = await createProduct.execute(command)

		res.status(200).json({
			message: 'Product created successfully',
			data: response,
		})
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while creating product',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.patch(
	'/products/:id',
	authorization,
	async (req: express.Request, res: express.Response) => {
		const { id } = req.params
		const { name, description, price, stock, category, attributes } = req.body

		if (!name || !description || !price || !stock || !category || !attributes) {
			res.status(400).json({
				error: 'Missing required fields: name, description, price, stock, category, attributes',
			})
			return
		}

		try {
			const command = new UpdateCommand({
				id,
				name,
				description,
				price,
				stock,
				category,
				attributes,
			})
			const updateProduct = container.resolve('updateProduct')
			await updateProduct.execute(command)

			res.status(200).json({
				message: 'Product updated successfully',
			})
		} catch (error) {
			res.status(500).json({
				message: 'An error occurred while updating product',
				error: (error as Error).message || 'Unknown error',
			})
		}
	}
)

router.delete(
	'/products/:id',
	authorization,
	async (req: express.Request, res: express.Response) => {
		const { id } = req.params

		if (!id) {
			res.status(400).json({
				error: 'Missing required fields: id',
			})
			return
		}

		try {
			const command = new DeleteCommand({ id })
			const deleteProduct = container.resolve('deleteProduct')
			await deleteProduct.execute(command)

			res.status(200).json({
				message: 'Product deleted successfully',
			})
		} catch (error) {
			res.status(500).json({
				message: 'An error occurred while deleting product',
				error: (error as Error).message || 'Unknown error',
			})
		}
	}
)

router.get('/products/:id?', async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	const search = req.query.search as string | undefined // Extraer `search` desde query params

	try {
		if (id && search) {
			res.status(400).json({
				message: 'Invalid request: You cannot use both "id" and "search" at the same time.',
			})
			return
		}

		if (id) {
			const getProduct = container.resolve('getProduct')
			const product = await getProduct.execute({ id })

			res.status(200).json({
				message: 'Product fetched successfully',
				product,
			})
			return
		}

		const command = new GetProductsCommand({ search })
		const getProducts = container.resolve('getProducts')
		const { products } = await getProducts.execute(command)

		res.status(200).json({
			message: 'Products fetched successfully',
			data: products,
		})
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while fetching the products',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
