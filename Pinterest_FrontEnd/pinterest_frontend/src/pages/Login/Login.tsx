import DatePicker from 'antd/lib/date-picker'
import { useLocation } from 'react-router-dom'
import route from 'src/constants/Route.constant'

const { login, register } = route

function Login() {
  const location = useLocation()
  return (
    <div className='flex items-center justify-around bg-black/70 py-5'>
      <div className='hidden w-[30%] font-medium text-background md:block md:text-4xl md:leading-snug lg:text-5xl xl:text-6xl xl:leading-normal'>
        Đăng {location.pathname === `/${register}` ? 'ký' : 'nhập'} để nhận thêm
        ý tưởng
      </div>
      <div className='mx-5 space-y-3 rounded-3xl bg-background px-8 py-5 shadow-sm md:mx-0 md:w-[45%] md:space-y-4 md:px-8 lg:w-[35%] lg:px-8 xl:w-[30%] xl:px-14'>
        <div className='flex items-center justify-center'>
          <div className='inline-block rounded-full bg-myRed p-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3 text-background md:h-4 md:w-4 xl:h-5 xl:w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
              />
            </svg>
          </div>
        </div>
        <div className='space-y-2 text-center text-lg font-medium md:text-xl lg:text-2xl xl:text-3xl'>
          <div>Chào mừng bạn đến với</div>
          <div>Vinterest</div>
        </div>
        <div className='text-center'>Tìm những ý tưởng mới để thử</div>
        <form className='space-y-4'>
          <div className='flex flex-col justify-start space-y-2'>
            <label htmlFor='email'>Email</label>
            <input
              className='rounded-xl border border-[2px] border-gray-300 px-3 py-2 focus:ring-4 focus:ring-blue-300'
              type='text'
              placeholder='Enter your email'
              name='email'
              id='email'
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <label htmlFor='password'>Mật khẩu</label>
            <input
              className='rounded-xl border border-[2px] border-gray-300 px-3 py-2 focus:ring-4 focus:ring-blue-300'
              type='text'
              name='password'
              id='password'
              placeholder='Enter your password'
            />
          </div>
          {location.pathname !== `/${register}` && (
            <div className='cursor-pointer text-right text-gray-500 duration-150 ease-linear hover:text-myRed'>
              Quên mật khẩu
            </div>
          )}
          {location.pathname === `/${register}` && (
            <div className='flex flex-col space-y-2'>
              <label htmlFor='password'>Ngày sinh</label>
              <DatePicker className='rounded-xl border border-[2px] border-gray-300 px-2 py-[5px] focus:ring-4 focus:ring-blue-300 lg:py-2' />
            </div>
          )}
          <div className='cursor-pointer rounded-xl bg-myRed py-3 text-center text-background duration-300 ease-in-out hover:bg-[#D50C22]'>
            {location.pathname === `/${login}` ? 'Đăng nhập' : 'Đăng ký'}
          </div>
          <div className='text-center'>
            Bằng cách dăng nhập, bạn đồng ý với Điều khoản dịch vụ của chúng tôi
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
