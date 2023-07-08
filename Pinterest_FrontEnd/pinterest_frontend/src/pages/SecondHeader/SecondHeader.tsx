import { NavLink } from 'react-router-dom'
import route from 'src/constants/Route.constant'

const { register } = route

function SecondHeader() {
  return (
    <div className='flex items-center justify-between px-5 py-2 lg:px-8 lg:py-4'>
      <NavLink to={'/'} className='flex cursor-pointer items-center space-x-3'>
        <div className='rounded-full bg-myRed p-2 lg:p-3'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5 text-background lg:h-6 lg:w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
            />
          </svg>
        </div>
        <span className='font-mono text-xl font-medium text-myRed lg:text-2xl'>
          Vinterest
        </span>
      </NavLink>
      <div className='flex items-center space-x-4 md:space-x-7 lg:space-x-10'>
        <button className='hidden md:block'>Giới thiệu</button>
        <button className='hidden md:block'>Doanh nghiệp</button>
        <button className='hidden md:block'>Blog</button>
        <NavLink
          to='/'
          className='rounded-3xl bg-myRed px-3 py-2 text-background duration-150 ease-in-out hover:bg-[#AD081B] md:px-4 md:py-2'
        >
          Đăng nhập
        </NavLink>
        <NavLink
          to={register}
          className='rounded-3xl bg-gray-200 px-3 py-2 duration-150 ease-in-out hover:bg-gray-300 md:px-4 md:py-2'
        >
          Đăng ký
        </NavLink>
      </div>
    </div>
  )
}

export default SecondHeader
