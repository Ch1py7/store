import { useAuthStore } from '@/shared/context/useAuthStore'
import { Roles } from '@/shared/utils'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
	allowedRoles: number[] // 1 = admin, 2 = user, 0 = guest
	redirectTo: string
}

export const ProtectedRoute = ({ allowedRoles, redirectTo }: ProtectedRouteProps) => {
	const { user, loading } = useAuthStore()

	const role = user ? user.role : Roles.guest

	if (!loading) {
		if (!allowedRoles.includes(role)) {
			return <Navigate to={redirectTo} replace />
		}
	}

	return <Outlet />
}
