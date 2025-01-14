import { Footer } from './Footer'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }): React.ReactNode => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}