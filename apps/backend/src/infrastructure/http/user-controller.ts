import { DeleteCommand } from '@/application/user/delete/command'
import { UpdateCommand } from '@/application/user/update/command'
import { container } from '@/container'
import express, { type Router } from 'express'

export const router: Router = express.Router()

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
		console.error('Error updating user:', error)

		res.status(500).json({
			message: 'An error occurred while update the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.put('/user/delete', async (req: express.Request, res: express.Response) => {
	const { id } = req.body

	if (!id) {
		res.status(400).json({
			message: 'Missing required fields: id',
		})
		return
	}

	try {
		const command = new DeleteCommand({ id })
		const deleteUser = container.resolve('deleteUser')
		await deleteUser.execute(command)

		res.status(200).json({
			message: 'User deleted successfully',
			data: {},
		})
	} catch (error) {
		console.error('Error deleting user:', error)

		res.status(500).json({
			message: 'An error occurred while delete the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
