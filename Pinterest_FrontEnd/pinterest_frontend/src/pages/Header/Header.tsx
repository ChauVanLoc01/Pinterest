import Popover from 'src/components/Popover'
import { Link, NavLink, useLocation } from 'react-router-dom'
import route from 'src/constants/Route.constant'
import classNames from 'classnames'

const { profile } = route

function Header() {
  const location = useLocation()
  return (
    <div className='sticky top-0 flex items-center justify-between md:p-3 lg:p-4'>
      <div className='flex w-[24%] items-center justify-between md:w-[35%] lg:w-[25%] xl:w-[18%]'>
        <div className='flex-shrink-0 rounded-full bg-myRed p-2 md:p-3'>
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
        <NavLink
          to={'/home'}
          className={`hidden rounded-full px-7 py-4 font-bold duration-300 ease-in-out md:block  ${classNames(
            { 'bg-character text-background': location.pathname === '/home' }
          )}`}
        >
          Trang chủ
        </NavLink>
        <Popover
          lable={
            <div className='flex items-end space-x-2 py-5 font-semibold'>
              <span>Tạo</span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3 md:h-4 md:w-4 xl:h-5 xl:w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </span>
            </div>
          }
          lableClassName=''
          subNodeClassName=''
          subNode={
            <div className='bg-gray-1000 flex flex-col rounded-3xl border-[1px] border-gray-100 bg-gray-50 px-2 py-1 font-semibold shadow-md md:px-3 md:py-2 lg:px-5 lg:py-4'>
              <Link
                to={'/'}
                className='rounded-xl p-2 hover:bg-gray-200 md:p-3 lg:p-4'
              >
                Tạo ghim ý tưởng
              </Link>
              <Link
                to={'/'}
                className='rounded-xl p-2 hover:bg-gray-200 md:p-3 lg:p-4'
              >
                Tạo ghim
              </Link>
            </div>
          }
        />
      </div>
      <div className='flex w-[75%] items-center justify-end space-x-4 md:space-x-8 lg:w-[65%] lg:space-x-12 xl:w-[70%]'>
        <form className='flex w-[70%] rounded-full bg-gray-200 px-2 py-2 md:w-[70%] md:px-3 md:py-2 lg:w-[80%] lg:px-4 lg:py-3'>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 flex-shrink-0 text-gray-500 md:h-5 md:w-5 lg:h-6 lg:w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </span>
          <input className='flex-grow pl-3 pr-3' type='text' />
        </form>
        <div className='flex space-x-2'>
          <NavLink
            to={`/${profile}`}
            className={
              'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 md:h-9 md:w-9 lg:h-10 lg:w-10'
            }
          >
            L
          </NavLink>
          <Popover
            lable={
              <button>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3 md:h-4 md:w-4 '
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </button>
            }
            lableClassName={''}
            subNode={
              <div className='flex flex-col rounded-xl border-[1px] border-gray-100 bg-gray-50 p-3 font-semibold shadow-md md:p-4 lg:p-5'>
                <div className='flex cursor-pointer items-center justify-center space-x-3 rounded-lg p-2 hover:bg-gray-200 md:p-3 lg:p-4'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-purple-400 text-background md:h-10 md:w-10 lg:h-12 lg:w-12 lg:text-xl'>
                    L
                  </div>
                  <div className='max-w-[200px] space-y-1 md:space-y-2'>
                    <div className='truncate font-bold'>Loc Chau</div>
                    <div className='truncate font-thin'>
                      locchau.220401@gmail.com
                    </div>
                  </div>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-4 w-4 md:h-5 md:w-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4.5 12.75l6 6 9-13.5'
                      />
                    </svg>
                  </div>
                </div>
                <Link
                  to={'/'}
                  className='cursor-pointer rounded-lg p-2 hover:bg-gray-200 md:p-3 lg:p-4'
                >
                  Chỉnh sửa hồ sơ
                </Link>
                <button className='cursor-pointer rounded-lg p-2 hover:bg-gray-200 md:p-3 lg:p-4'>
                  Đăng xuất
                </button>
              </div>
            }
            subNodeClassName=''
          />
        </div>
      </div>
    </div>
  )
}

export default Header
