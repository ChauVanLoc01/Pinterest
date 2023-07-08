import DatePicker from 'antd/lib/date-picker'

function Register() {
  return (
    <div className='flex items-center justify-around overflow-x-hidden bg-black/70 py-5'>
      <div className='w-[30%] text-6xl font-medium text-background'>
        Đăng ký để nhận thêm ý tưởng
      </div>
      <div className='w-[30%] space-y-4 rounded-3xl bg-background px-16 py-5 shadow-sm'>
        <div className='flex items-center justify-center'>
          <div className='inline-block rounded-full bg-myRed p-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5 text-background'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
              />
            </svg>
          </div>
        </div>
        <div className='space-y-2 text-center text-3xl font-medium'>
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
            />
          </div>
          <div className='flex flex-col space-y-2'>
            <label htmlFor='password'>Ngày sinh</label>
            <DatePicker className='rounded-xl border border-[2px] border-gray-300 px-3 py-2 focus:ring-4 focus:ring-blue-300' />
          </div>
          <span>Quên mật khẩu</span>
          <div className='cursor-pointer rounded-xl bg-myRed py-3 text-center text-background duration-300 ease-in-out hover:bg-[#D50C22]'>
            Đăng nhập
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
