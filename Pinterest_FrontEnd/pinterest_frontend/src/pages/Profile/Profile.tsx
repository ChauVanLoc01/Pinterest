import { Link } from 'react-router-dom'

function Profile() {
  return (
    <div className='flex'>
      <div className='mt-10 flex w-[20%] flex-col space-y-7 font-semibold'>
        <div>
          <Link to={''} className='rounded-lg px-5 py-3 hover:bg-gray-200'>
            Hồ sơ công khai
          </Link>
        </div>
        <div>
          <Link to={''} className='rounded-lg px-5 py-3 hover:bg-gray-200'>
            Quản lý tài khoản
          </Link>
        </div>
      </div>
      <div className=''></div>
    </div>
  )
}

export default Profile
