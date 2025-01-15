import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from './app/layout/Layout'
import { ProductsCatalog as Products } from './pages/Products/ProductsCatalog'
import { SearchBar } from '@/shared/ui/SearchBar'

export const App = () => {
	return (
		<Router>
			<SearchBar />
			<Layout>
				<Routes>
					<Route path='/' element={<Products />} />
				</Routes>
			</Layout>
		</Router>
	)
}
