import { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const Header = lazy(() => import('src/pages/Header'))
const Footer = lazy(() => import('src/pages/Footer'))

function Mainlayout() {
  return (
    <div className='max-w-screen bg-background text-xs text-character lg:text-sm xl:text-base'>
      <div className='p-2 md:px-4'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Mainlayout
