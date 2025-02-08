import { CreateSessionCommand } from '@/application/create_session/command'
import { LoginCommand } from '@/application/login/command'
import { RefreshSessionCommand } from '@/application/refresh_session/command'
import { CreateCommand } from '@/application/register/command'
import { container } from '@/container'
import express, { type Router } from 'express'
import { authorization } from './middlewares/authorizationMiddleware'

export const router: Router = express.Router()

router.post('/auth/register', async (req: express.Request, res: express.Response) => {
	const { firstName, email, lastName, password, role } = req.body

	if (!firstName || !email || !lastName || !password || !role) {
		res.status(400).json({
			error: 'Missing required fields: firstName, email, lastName, password, role.',
		})
		return
	}

	try {
		const userCommand = new CreateCommand({ firstName, email, lastName, password, role })
		const registerUser = container.resolve('registerUser')
		const userResponse = await registerUser.execute(userCommand)

		const sessionCommand = new CreateSessionCommand(userResponse)
		const createSession = container.resolve('createSession')
		const { access_token, refresh_token } = await createSession.execute(sessionCommand)

		setAuthCookies(res, access_token, refresh_token)
		res.status(201).json({
			message: 'User registered successfully',
		})
	} catch (error) {
		console.error('Error registering user:', error)

		res.status(500).json({
			message: 'An error occurred while register the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.post('/auth/login', async (req: express.Request, res: express.Response) => {
	const { email, password } = req.query as { email: string; password: string }

	if (!email || !password) {
		res.status(400).json({
			error: 'Missing required fields: email, password',
		})
		return
	}

	try {
		const userCommand = new LoginCommand({ email, password })
		const loginUser = container.resolve('loginUser')
		const userResponse = await loginUser.execute(userCommand)

		const sessionCommand = new CreateSessionCommand(userResponse)
		const createSession = container.resolve('createSession')
		const { access_token, refresh_token } = await createSession.execute(sessionCommand)

		setAuthCookies(res, access_token, refresh_token)
		res.status(200).json({
			message: 'User login successfully',
		})
	} catch (error) {
		console.error('Error login user:', error)

		res.status(500).json({
			message: 'An error occurred while login the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.post('/auth/refresh', authorization, async (req: express.Request, res: express.Response) => {
	const { refresh_token } = req.cookies
	if (!refresh_token) {
		res.status(400).json({ error: 'Missing refresh token' })
		return
	}

	try {
		const refreshSessionCommand = new RefreshSessionCommand(refresh_token)
		const refreshSession = container.resolve('refreshSession')
		const { new_access_token, new_refresh_token } =
			await refreshSession.execute(refreshSessionCommand)

		setAuthCookies(res, new_access_token, new_refresh_token)
		res.status(200).json({
			message: 'Token refreshed successfully',
		})
	} catch (error) {
		console.error('Error update token:', error)

		res.status(500).json({
			message: 'Login failed due to a server error. Please try again later.',
			error: error instanceof Error ? error.message : 'Unknown error',
		})
	}
})

const setAuthCookies = (res: express.Response, access_token: string, refresh_token: string) => {
	const isProduction = process.env.NODE_ENV === 'production'

	res.cookie('access_token', access_token, {
		httpOnly: true,
		maxAge: 900000,
		secure: isProduction,
		sameSite: 'strict',
	})
	res.cookie('refresh_token', refresh_token, {
		httpOnly: true,
		maxAge: 86400000,
		secure: isProduction,
		sameSite: 'strict',
	})
	res.cookie('token_type', 'Bearer', {
		httpOnly: false,
		maxAge: 86400000,
		secure: isProduction,
		sameSite: 'strict',
	})
	res.cookie('expires_in', 900, {
		httpOnly: false,
		maxAge: 900000,
		secure: isProduction,
		sameSite: 'strict',
	})
}
