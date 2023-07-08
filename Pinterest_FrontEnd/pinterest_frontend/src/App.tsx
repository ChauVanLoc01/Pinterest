import { lazy, Suspense, useContext, useEffect } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Mainlayout from './layouts/MainLayout'
import { Context } from './contexts/AppContext'
import route from './constants/Route.constant'
import SecondLayout from './layouts/SecondLayout'

const { created, login, profile, register, saved } = route

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const Created = lazy(() => import('./pages/Created'))
const Saved = lazy(() => import('./pages/Saved'))

const ProtectRoute = () => {
  const { isAuth } = useContext(Context)
  return isAuth ? <Outlet /> : <Navigate to={`/${login}`} />
}

const InjectRoute = () => {
  const { isAuth } = useContext(Context)
  return !isAuth ? <Outlet /> : <Navigate to={'/'} />
}

function App() {
  useEffect(() => {
    alert('Project is under construction')
  }, [])

  return (
    <Routes>
      <Route element={<InjectRoute />}>
        <Route path='/' element={<SecondLayout />}>
          <Route
            index
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
          <Route
            path={register}
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route element={<ProtectRoute />}>
        <Route path='/' element={<Mainlayout />}>
          <Route
            path='home'
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={profile}
            element={
              <Suspense>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path={saved}
            element={
              <Suspense>
                <Saved />
              </Suspense>
            }
          />
          <Route
            path={created}
            element={
              <Suspense>
                <Created />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
