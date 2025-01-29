import { CreateCommand } from '@/application/product/create/command'
import { container } from '@/container'
import express, { type Router } from 'express'

export const router: Router = express.Router()

router.post('/products/', async (req: express.Request, res: express.Response) => {
	const { name, description, percentageDiscount, price, size, stock } = req.body

	if (!name || !description || !percentageDiscount || !price || !size || !stock) {
		res.status(400).json({
			message: 'Missing required fields: name, description, percentageDiscount, price, size, stock',
		})
		return
	}

	try {
		const command = new CreateCommand({ name, description, percentageDiscount, price, size, stock })
		const createProduct = container.resolve('createProduct')
		const response = await createProduct.execute(command)

		res.status(200).json({
			message: 'Product created successfully',
			data: response,
		})
	} catch (error) {
		console.error('Error creating product:', error)

		res.status(500).json({
			message: 'An error occurred while creating product',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.get('/products/:id?', async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	try {
		if (id) {
			const getProduct = container.resolve('getProduct')
			const product = await getProduct.execute({ id })

			res.status(200).json({
				message: 'Product fetched successfully',
				data: { product },
			})
		} else {
			const getProducts = container.resolve('getProducts')
			const { products } = await getProducts.execute()

			res.status(200).json({
				message: 'Products fetched successfully',
				data: { products },
			})
		}
	} catch (error) {
		console.error('Error fetching products or product:', error)

		res.status(500).json({
			message: 'An error occurred while fetching the products',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
