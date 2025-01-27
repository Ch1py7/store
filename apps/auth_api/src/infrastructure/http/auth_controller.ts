import { CreateCommand } from '@/application/register/command'
import { container } from '@/container'
import express, { type Router } from 'express'

export const router: Router = express.Router()

router.post('/auth/register', async (req: express.Request, res: express.Response) => {
	const { firstName, email, lastName, password, role } = req.body

	if (!firstName || !email || !lastName || !password || !role) {
		res.status(400).json({
			message: 'Missing required fields: firstName, email, lastName, password, role',
		})
		return
	}

	try {
		const command = new CreateCommand({ firstName, email, lastName, password, role })
		const registerUser = container.resolve('registerUser')
		const response = await registerUser.execute(command)

		res.status(201).json({
			message: 'User registered successfully',
			data: response,
		})
	} catch (error) {
		console.error('Error registering user:', error)

		res.status(500).json({
			message: 'An error occurred while register the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
