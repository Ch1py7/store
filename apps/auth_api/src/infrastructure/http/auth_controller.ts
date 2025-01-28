import { CreateSessionCommand } from '@/application/create_session/command'
import { LoginCommand } from '@/application/login/command'
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
		const userCommand = new CreateCommand({ firstName, email, lastName, password, role })
		const registerUser = container.resolve('registerUser')
		const userResponse = await registerUser.execute(userCommand)

		const sessionCommand = new CreateSessionCommand(userResponse)
		const createSession = container.resolve('createSession')
		const { jwt } = await createSession.execute(sessionCommand)

		res.status(201).json({
			message: 'User registered successfully',
			data: jwt,
		})
	} catch (error) {
		console.error('Error registering user:', error)

		res.status(500).json({
			message: 'An error occurred while register the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.get('/auth/login', async (req: express.Request, res: express.Response) => {
	const { email, password } = req.query as { email: string, password: string}

	if (!email || !password) {
		res.status(400).json({
			message: 'Missing required fields: email, password',
		})
		return
	}

	try {
		const userCommand = new LoginCommand({ email, password })
		const loginUser = container.resolve('loginUser')
		const userResponse = await loginUser.execute(userCommand)

		const sessionCommand = new CreateSessionCommand(userResponse)
		const createSession = container.resolve('createSession')
		const { jwt } = await createSession.execute(sessionCommand)

		res.status(200).json({
			message: 'User login successfully',
			data: jwt,
		})
	} catch (error) {
		console.error('Error login user:', error)

		res.status(500).json({
			message: 'An error occurred while login the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
