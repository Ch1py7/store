import { CreateCommand } from '@/application/user/create/command'
import { UpdateCommand } from '@/application/user/update/command'
import { container } from '@/container'
import express from 'express'

export const router = express.Router()

router.post('/user/create', async (req: express.Request, res: express.Response) => {
	const { firstName, email, lastName, password, role } = req.body

	if (!firstName || !email || !lastName || !password || !role) {
		res.status(400).json({
			message: 'Missing required fields: firstName, email, lastName, password, role',
		})
		return
	}

	try {
		const command = new CreateCommand({ firstName, email, lastName, password, role })
		const createUser = container.resolve('createUser')
		const response = await createUser.execute(command)

		res.status(201).json({
			message: 'User created successfully',
			data: response,
		})
	} catch (error) {
		console.error('Error creating user:', error)

		res.status(500).json({
			message: 'An error occurred while creating the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.put('/user/update', async (req: express.Request, res: express.Response) => {
	const { id, firstName, lastName } = req.body

	if (!id || !firstName || !lastName) {
		res.status(400).json({
			message: 'Missing required fields: id, firstname, lastName role',
		})
		return
	}

	try {
		const command = new UpdateCommand({ id, firstName, lastName })
		const updateUser = container.resolve('updateUser')
		const response = await updateUser.execute(command)

		res.status(200).json({
			message: 'User updated successfully',
			data: response,
		})
	} catch (error) {
		console.error('Error creating user:', error)

		res.status(500).json({
			message: 'An error occurred while update the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
