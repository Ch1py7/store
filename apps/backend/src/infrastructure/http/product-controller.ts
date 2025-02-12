import { CreateCommand } from '@/application/product/create/command'
import { container } from '@/container'
import express, { type Router } from 'express'

export const router: Router = express.Router()

router.post('/products/', async (req: express.Request, res: express.Response) => {
	const { name, description, percentageDiscount, price, size, stock, sizeToShow } = req.body

	if (!name || !description || !percentageDiscount || !price || !size || !stock || !sizeToShow) {
		res.status(400).json({
			error:
				'Missing required fields: name, description, percentageDiscount, price, size, stock, sizeToShow',
		})
		return
	}

	try {
		const command = new CreateCommand({
			name,
			description,
			percentageDiscount,
			price,
			size,
			stock,
			sizeToShow,
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

router.get('/products/:id?', async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	try {
		if (id) {
			const getProduct = container.resolve('getProduct')
			const product = await getProduct.execute({ id })

			res.status(200).json({
				message: 'Product fetched successfully',
				product,
			})
		} else {
			const getProducts = container.resolve('getProducts')
			const { products } = await getProducts.execute()

			res.status(200).json({
				message: 'Products fetched successfully',
				data: products,
			})
		}
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while fetching the products',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
