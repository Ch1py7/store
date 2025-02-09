import axios, { AxiosError } from 'axios'
import { AuthService } from './auth'

const axiosInstance = axios.create({
	withCredentials: true,
})

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		const { error: errorMessage } = error.response.data

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			errorMessage === 'Unauthorized'
		) {
			originalRequest._retry = true

			try {
				await axiosInstance.post(AuthService.refreshToken)

				return axiosInstance(originalRequest)
			} catch (refreshError) {
				logoutAndRedirect()
				return Promise.reject(refreshError)
			}
		}

		if (error.response?.status === 500 && errorMessage === 'Refresh token revoked') {
			logoutAndRedirect()
			return Promise.reject(error)
		}

		return Promise.reject(error)
	}
)

const logoutAndRedirect = () => {
	if (window.location.pathname !== '/auth/login') {
		window.location.href = '/auth/login'
	}
}

export const postRequest = async <T>(url: string, dataToSend: any) => {
	try {
		const { data, status } = (await axiosInstance.post(url, dataToSend)) as {
			data: T
			status: number
		}

		return { data, status }
	} catch (er) {
		if (er instanceof AxiosError) {
			throw er
		}
		throw [(er as Error).message]
	}
}

export const getRequest = async <T>(url: string) => {
	try {
		const response = (await axiosInstance.get(url)) as { data: T; status: number }

		return { data: response.data, status: response.status }
	} catch (er) {
		if (er instanceof AxiosError) {
			throw er
		}
		throw [(er as Error).message]
	}
}

export const deleteRequest = async <T>(url: string) => {
	try {
		const response = (await axiosInstance.delete(url)) as { data: T; status: number }

		return { data: response.data, status: response.status }
	} catch (er) {
		if (er instanceof AxiosError) {
			throw er
		}
		throw [(er as Error).message]
	}
}

export const patchRequest = async <T>(url: string, data: T) => {
	try {
		const response = (await axiosInstance.patch(url, data)) as { data: T; status: number }

		return { data: response.data, status: response.status }
	} catch (er) {
		if (er instanceof AxiosError) {
			throw er
		}
		throw [(er as Error).message]
	}
}
