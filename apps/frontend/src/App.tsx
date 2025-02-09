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
import { Wishlist } from './pages/Wishlist/Wishlist'
import { LocalStorage } from './shared/context/localStorage'
import { Toast } from './shared/ui/Toast'

export const App = () => {
	return (
		<Router>
			<LocalStorage.Provider>
				<SearchBar />
				<Layout>
					<Routes>
						<Route path='/' element={<Products />} />
						<Route element={<ProtectedRoute requiredRole={1} />}>
							<Route path='/admin' element={<h1>user</h1>} />
							<Route path='/account' element={<Account />} />
						</Route>
						<Route element={<ProtectedRoute requiredRole={2} />}>
							<Route path='/account' element={<Account />} />
						</Route>
						<Route element={<ProtectedRoute />}>
							<Route path='/auth/login' element={<Login />} />
							<Route path='/auth/register' element={<Register />} />
							<Route path='/auth/recovery' element={<Recovery />} />
							<Route path='/auth/validation' element={<Validation />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='/wishlist' element={<Wishlist />} />
						</Route>
					</Routes>
				</Layout>
			</LocalStorage.Provider>
			<Toast />
		</Router>
	)
}
