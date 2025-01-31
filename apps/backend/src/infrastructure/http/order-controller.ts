import { CreateCommand } from '@/application/order/create/command'
import { container } from '@/container'
import express, { type Router } from 'express'

export const router: Router = express.Router()

router.post('/orders/', async (req: express.Request, res: express.Response) => {
	const { userId, products } = req.body as CreateCommand

	if (!userId || !products) {
		res.status(400).json({
			message: 'Missing required fields: userId, products',
		})
		return
	}

	const requiredKeys = ['id', 'quantity', 'size']
	const isValidProducts = products.every((product) => requiredKeys.every((key) => key in product))

	if (!isValidProducts) {
		res.status(400).json({
			message: 'Each product must have id, quantity, and size',
		})
		return
	}

	try {
		const command = new CreateCommand({ userId, products })
		const createOrder = container.resolve('createOrder')
		const response = await createOrder.execute(command)

		res.status(200).json({
			message: 'Order created successfully',
			data: response,
		})
	} catch (error) {
		console.error('Error creating order:', error)

		res.status(500).json({
			message: 'An error occurred while creating order',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
