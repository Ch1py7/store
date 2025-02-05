export namespace AuthService {
	export const login = ({ email, password }: Login) => {
		return `http://localhost:7777/api/v1/auth/login?email=${email}&password=${password}`
	}

	export const register = () => {
		return 'http://localhost:7777/api/v1/auth/register'
	}
}

interface Login {
	email: string
	password: string
}
