import { type OrderFlowState, useOrderFlowStore } from '@/shared/context/useOrderFlow'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface OrderProtectedRouteProps {
	allowedSteps: OrderFlowState['step'][]
	redirectTo?: string
}

const OrderProtectedRoute: React.FC<OrderProtectedRouteProps> = ({
	allowedSteps,
	redirectTo = '/cart',
}) => {
	const step = useOrderFlowStore((state) => state.step)
	const location = useLocation()

	if (!allowedSteps.includes(step)) {
		return <Navigate to={redirectTo} state={{ from: location }} replace />
	}

	return <Outlet />
}

export default OrderProtectedRoute
