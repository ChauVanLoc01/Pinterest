import { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const SecondHeader = lazy(() => import('src/pages/SecondHeader'))
const Footer = lazy(() => import('src/pages/Footer'))

function SecondLayout() {
  return (
    <div className='max-w-screen overflow-x-hidden bg-background text-xs text-character lg:text-sm xl:text-base'>
      <SecondHeader />
      <div className=''>
        <img src='' alt='' />
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default SecondLayout
