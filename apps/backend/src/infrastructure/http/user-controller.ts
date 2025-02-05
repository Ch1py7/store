import { DeleteCommand } from '@/application/user/delete/command'
import { UpdateCommand } from '@/application/user/update/command'
import { container } from '@/container'
import express, { type Router } from 'express'

export const router: Router = express.Router()

router.patch('/users/:id', async (req: express.Request, res: express.Response) => {
	const { id } = req.params
	const { firstName, lastName } = req.body

	if (!id || !firstName || !lastName) {
		res.status(400).json({
			error: 'Missing required fields: id, firstname, lastName',
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
			message: 'An error occurred while updating user data',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.patch('/users/:id/delete', async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	if (!id) {
		res.status(400).json({
			error: 'Missing required field: id',
		})
		return
	}

	try {
		const command = new DeleteCommand({ id })
		const deleteUser = container.resolve('deleteUser')
		const user = await deleteUser.execute(command)

		res.status(200).json({
			message: 'User deleted successfully',
			data: {
				user,
			},
		})
	} catch (error) {
		console.error('Error deleting user:', error)

		res.status(500).json({
			message: 'An error occurred while deleting the user',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.get('/users/:id?', async (req: express.Request, res: express.Response) => {
	const { id } = req.params

	try {
		if (id) {
			const getUser = container.resolve('getUser')
			const user = await getUser.execute({ id })

			res.status(200).json({
				message: 'User fetched successfully',
				data: { user },
			})
		} else {
			const getUsers = container.resolve('getUsers')
			const {users} = await getUsers.execute()

			res.status(200).json({
				message: 'Users fetched successfully',
				data: { users },
			})
		}
	} catch (error) {
		console.error('Error fetching users or user:', error)

		res.status(500).json({
			message: 'An error occurred while fetching the users',
			error: (error as Error).message || 'Unknown error',
		})
	}
})
