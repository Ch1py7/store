import { container } from '@/container'
import express, { type Router } from 'express'

export const router: Router = express.Router()

router.get('/cart/:userId', async (req: express.Request, res: express.Response) => {
	const { userId } = req.params

	if (!userId) {
		res.status(400).json({
			message: 'Missing required field: userId',
		})
		return
	}

	try {
		const getCart = container.resolve('getCart')
		const cart = await getCart.execute({ userId })

		res.status(200).json({
			message: 'Cart fetched successfully',
			data: { cart },
		})
	} catch (error) {
		console.error('Error fetching cart:', error)

		res.status(500).json({
			message: 'An error occurred while fetching the cart',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.patch('/cart/userId', async (req: express.Request, res: express.Response) => {
	const { userId } = req.params
	const { products } = req.body

	if (!userId) {
		res.status(400).json({
			message: 'Missing required field: userId',
		})
		return
	}

	try {
		const updateCart = container.resolve('updateCart')
		const cart = await updateCart.execute({ userId, products })

		res.status(200).json({
			message: 'Cart updated successfully',
			data: { cart },
		})
	} catch (error) {
		console.error('Error fetching orders:', error)

		res.status(500).json({
			message: 'An error occurred while fetching the orders',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
