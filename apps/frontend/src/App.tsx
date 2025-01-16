import { SearchBar } from '@/shared/ui/SearchBar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from './app/layout/Layout'
import { Account } from './pages/Account/Account'
import { Cart } from './pages/Cart/Cart'
import { ProductsCatalog as Products } from './pages/Products/ProductsCatalog'
import { LocalStorage } from './shared/context/localStorage'

export const App = () => {
	return (
		<Router>
			<LocalStorage.Provider>
				<SearchBar />
				<Layout>
					<Routes>
						<Route path='/' element={<Products />} />
						<Route path='/account' element={<Account />} />
						<Route path='/cart' element={<Cart />} />
					</Routes>
				</Layout>
			</LocalStorage.Provider>
		</Router>
	)
}
