import { SearchBar } from '@/shared/ui/SearchBar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from './app/layout/Layout'
import { ProtectedRoute } from './app/ProtectedRoute'
import { Account } from './pages/Account/Account'
import { Login } from './pages/Auth/Login'
import { Recovery } from './pages/Auth/Recovery'
import { Register } from './pages/Auth/Register'
import { Validation } from './pages/Auth/Validation'
import { Cart } from './pages/Cart/Cart'
import { ProductsCatalog as Products } from './pages/Products/ProductsCatalog'
import { Toast } from './shared/ui/Toast'
import { Roles } from './shared/utils'

export const App = () => {
	return (
		<Router>
			<SearchBar />
			<Layout>
				<Routes>
					<Route path='/' element={<Products />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/account' element={<Account />} />
					<Route element={<ProtectedRoute allowedRoles={[Roles.guest]} redirectTo='/account' />}>
						<Route path='/auth/login' element={<Login />} />
						<Route path='/auth/register' element={<Register />} />
						<Route path='/auth/recovery' element={<Recovery />} />
						{/* todo: create account activation flow in back */}
						{/* <Route path='/auth/validation' element={<Validation />} /> */}
					</Route>
					<Route path='*' element={<h1>Not found</h1>} />
				</Routes>
			</Layout>
			<Toast />
		</Router>
	)
}
