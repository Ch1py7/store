import { useAuthStore } from '@/shared/context/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
	requiredRole: number
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
	const user = useAuthStore((state) => state.user)

	if (!user) {
		return <Navigate to='/auth/login' replace />
	}

	if (user.role !== requiredRole) {
		return <Navigate to='/unauthorized' replace />
	}

	return <Outlet />
}
