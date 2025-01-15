import { LocalStorage } from '@/shared/context/localstorage'
import { SearchBar } from '@/shared/ui/SearchBar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from './app/layout/Layout'
import { Account } from './pages/Account/Account'
import { ProductsCatalog as Products } from './pages/Products/ProductsCatalog'

export const App = () => {
	return (
		<Router>
			<LocalStorage.Provider>
				<SearchBar />
				<Layout>
					<Routes>
						<Route path='/' element={<Products />} />
						<Route path='/account' element={<Account />} />
					</Routes>
				</Layout>
			</LocalStorage.Provider>
		</Router>
	)
}
