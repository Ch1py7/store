import { Footer } from './Footer'
import { Navbar } from './Navbar'

interface LayoutProps {
	children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }): React.ReactNode => {
	return (
		<div className='bg-white shadow-sm py-5'>
			<div className='mx-auto'>
				<Navbar />
				<main className='min-h-[67vh]'>{children}</main>
				<Footer />
			</div>
		</div>
	)
}
