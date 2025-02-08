import { create } from 'zustand'
import { AuthService } from '../service/requests/auth'
import { getRequest } from '../service/requests/requests'

type User = {
	firstName: string
	lastName: string
	role: number
} | null

interface AuthState {
	user: User
	loading: boolean
	checkAuth: () => Promise<void>
	isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	loading: true,

	isAuthenticated: () => get().user !== null,

	checkAuth: async () => {
		set({ loading: true })

		try {
			const { data } = await getRequest<User>(AuthService.getUserData)
			set({ user: data, loading: false })
		} catch {
			set({ user: null, loading: false })
		}
	},
}))
