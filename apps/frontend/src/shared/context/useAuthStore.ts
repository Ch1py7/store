import { create } from 'zustand'
import { AuthService } from '../service/requests/auth'
import { getRequest, postRequest } from '../service/requests/requests'

type User = {
	firstName: string
	lastName: string
	email: string
	role: number
} | null

interface Response {
	data: { message: string }
	status: number
}

interface AuthState {
	user: User
	loading: boolean
	checkAuth: () => Promise<void>
	login: (data: any) => Promise<Response>
	register: (data: any) => Promise<Response>
	logout: () => Promise<void>
	isAuthenticated: boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	loading: true,
	isAuthenticated: false,


	checkAuth: async () => {
		set({ loading: true })

		try {
			const { response: data } = await getRequest<User>(AuthService.getUserData)
			set({ user: data, loading: false, isAuthenticated: true })
		} catch {
			set({ user: null, loading: false, isAuthenticated: false })
		}
	},

	login: async (dataToSend: any) => {
		set({ loading: true })

		try {
			const { data, status } = await postRequest<{ message: string }>(AuthService.login, dataToSend)
			if (status === 200) {
				get().checkAuth()
			}
			set({ loading: false })

			return { data, status }
		} catch (er) {
			set({ loading: false })
			throw er
		}
	},

	register: async (dataToSend: any) => {
		set({ loading: true })

		try {
			const { data, status } = await postRequest<{ message: string }>(
				AuthService.register,
				dataToSend
			)
			if (status === 201) {
				get().checkAuth()
			}

			set({ loading: false })

			return { data, status }
		} catch (er) {
			set({ loading: false })
			throw er
		}
	},

	logout: async () => {
		set({ loading: true })

		try {
			await postRequest(AuthService.logout, {})
			set({ user: null, loading: false })
		} catch {
			set({ loading: false })
		}
	},
}))
