import { ReactNode, createContext, useState } from 'react'
import { User } from 'src/types/User.type'

export type ContextType = {
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

type ContextProps = {
  children: ReactNode
}

const initialContext: ContextType = {
  isAuth: false,
  setIsAuth: () => null,
  user: null,
  setUser: () => null
}

export const Context = createContext<ContextType>(initialContext)

function AppContext({ children }: ContextProps) {
  const [user, setUser] = useState<User | null>({
    full_name: '',
    birth_day: '',
    description: ''
  })
  const [isAuth, setIsAuth] = useState<boolean>(false)
  return (
    <Context.Provider
      value={{
        isAuth,
        setIsAuth,
        setUser,
        user
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default AppContext
