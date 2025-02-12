import { container } from '@/container'
import express, { type Router } from 'express'
import { authorization } from './middlewares/authorizationMiddleware'
import { validateProducts } from './middlewares/validateProducts'

export const router: Router = express.Router()

router.get('/cart/', authorization, async (req: express.Request, res: express.Response) => {
	if (!req.user) {
		res.status(401).json({ error: 'Unauthorized' })
		return
	}

	try {
		const getCart = container.resolve('getCart')
		const cart = await getCart.execute({ userId: req.user.sub })

		res.status(200).json({
			message: 'Cart fetched successfully',
			cart,
		})
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while fetching the cart',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.patch(
	'/cart/',
	authorization,
	validateProducts,
	async (req: express.Request, res: express.Response) => {
		if (!req.user) {
			res.status(401).json({ error: 'Unauthorized' })
			return
		}

		const { products } = req.body

		try {
			const updateCart = container.resolve('updateCart')
			const cart = await updateCart.execute({ userId: req.user.sub, products })

			res.status(200).json({
				message: 'Cart updated successfully',
				cart,
			})
		} catch (error) {
			res.status(500).json({
				message: 'An error occurred while fetching the orders',
				error: (error as Error).message || 'Unknown error',
			})
		}
	}
)
