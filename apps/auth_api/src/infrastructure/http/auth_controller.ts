import { CreateSessionCommand } from '@/application/create_session/command'
import { LoginCommand } from '@/application/login/command'
import { RefreshSessionCommand } from '@/application/refresh_session/command'
import { CreateCommand } from '@/application/register/command'
import { RevokeSessionCommand } from '@/application/revoke_session/command'
import { container } from '@/container'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import express, { type Router } from 'express'
import { authorization } from './middlewares/authorizationMiddleware'
import { validateRegister } from './middlewares/validateRegister'

dayjs.extend(utc)
dayjs.extend(timezone)

export const router: Router = express.Router()

router.post(
	'/auth/register',
	validateRegister,
	async (req: express.Request, res: express.Response) => {
		const { firstName, email, lastName, password, role, cart } = req.body

		try {
			const userCommand = new CreateCommand({ firstName, email, lastName, password, role, cart })
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
			res.status(500).json({
				message: 'An error occurred while register the user',
				error: (error as Error).message || 'Unknown error',
			})
		}
	}
)

router.post('/auth/login', async (req: express.Request, res: express.Response) => {
	const { email, password } = req.body

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

		const sessionCommand = new CreateSessionCommand({ ...userResponse, email })
		const createSession = container.resolve('createSession')
		const { access_token, refresh_token } = await createSession.execute(sessionCommand)

		setAuthCookies(res, access_token, refresh_token)
		res.status(200).json({
			message: 'User login successfully',
		})
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while login the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.post('/auth/refresh', async (req: express.Request, res: express.Response) => {
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
		console.log('Error update token:', error)

		res.status(500).json({
			error: error instanceof Error ? error.message : 'Unknown error',
		})
	}
})

router.post('/auth/logout', async (req: express.Request, res: express.Response) => {
	const { refresh_token } = req.cookies
	if (!refresh_token) {
		res.status(400).json({ error: 'Missing refresh token' })
		return
	}

	try {
		const revokeSessionCommand = new RevokeSessionCommand(refresh_token)
		const revokeSession = container.resolve('revokeSession')
		await revokeSession.execute(revokeSessionCommand)

		setAuthCookies(res, '', '')
		res.status(200).json({ message: 'Logged out' })
	} catch (error) {
		console.log('Error to logout:', error)

		res.status(500).json({
			error: error instanceof Error ? error.message : 'Unknown error',
		})
	}
})

router.get('/auth/me', authorization, async (req: express.Request, res: express.Response) => {
	if (!req.user) {
		res.status(401).json({ error: 'Unauthorized' })
		return
	}

	res.status(200).json({
		firstName: req.user.firstName,
		lastName: req.user.lastName,
		email: req.user.email,
		role: req.user.role,
	})
})

const setAuthCookies = (res: express.Response, access_token: string, refresh_token: string) => {
	const isProduction = process.env.NODE_ENV === 'production'
	const now = dayjs().tz('America/Mexico_City')
	const accessTokenExpires = now.add(1, 'minute')
	const refreshTokenExpires = now.add(7, 'day')

	res.cookie('access_token', access_token, {
		httpOnly: true,
		expires: accessTokenExpires.toDate(),
		secure: isProduction,
		sameSite: 'strict',
		path: '/',
	})
	res.cookie('refresh_token', refresh_token, {
		httpOnly: true,
		expires: refreshTokenExpires.toDate(),
		secure: isProduction,
		sameSite: 'strict',
		path: '/',
	})
	res.cookie('token_type', 'Bearer', {
		httpOnly: false,
		expires: accessTokenExpires.toDate(),
		secure: isProduction,
		sameSite: 'strict',
		path: '/',
	})
	res.cookie('expires_in', 900, {
		httpOnly: false,
		expires: accessTokenExpires.toDate(),
		secure: isProduction,
		sameSite: 'strict',
		path: '/',
	})
}
