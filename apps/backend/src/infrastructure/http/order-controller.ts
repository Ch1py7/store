import { CreateCommand } from '@/application/order/create/command'
import { container } from '@/container'
import express, { type Router } from 'express'

export const router: Router = express.Router()

router.post('/orders/', async (req: express.Request, res: express.Response) => {
	const { userId, products } = req.body as CreateCommand

	if (!userId || !products) {
		res.status(400).json({
			error: 'Missing required fields: userId, products',
		})
		return
	}

	const requiredKeys = ['id', 'quantity', 'size']
	const isValidProducts = products.every((product) => requiredKeys.every((key) => key in product))

	if (!isValidProducts) {
		res.status(400).json({
			error: 'Each product must have id, quantity, and size',
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

router.get('/orders/:id', async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	if (!id) {
		res.status(400).json({
			error: 'Missing required fields: id',
		})
		return
	}

	try {
		if (id) {
			const getOrder = container.resolve('getOrder')
			const order = await getOrder.execute({ id })

			res.status(200).json({
				message: 'Order fetched successfully',
				data: { order },
			})
		} else {
			const getOrders = container.resolve('getOrders')
			const { orders } = await getOrders.execute()

			res.status(200).json({
				message: 'Orders fetched successfully',
				data: { orders },
			})
		}
	} catch (error) {
		console.error('Error fetching orders or order:', error)

		res.status(500).json({
			message: 'An error occurred while fetching the orders',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.get('/orders/user/:id', async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	if (!id) {
		res.status(400).json({
			error: 'Missing required fields: id',
		})
		return
	}

	try {
		const getOrdersByUserId = container.resolve('getOrdersByUserId')
		const orders = await getOrdersByUserId.execute({ id })

		res.status(200).json({
			message: 'Orders fetched successfully',
			data: { orders },
		})
	} catch (error) {
		console.error('Error fetching orders:', error)

		res.status(500).json({
			message: 'An error occurred while fetching the orders',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
