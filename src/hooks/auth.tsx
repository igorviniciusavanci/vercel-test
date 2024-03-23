import { AxiosInstance } from 'axios'
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import type PermissionData from '../DTO/permissionData'
import { setupAPIClient } from '../server/api'

interface UserData {
  id: string
  email: string
  name: string
  cpf: string
  roles: string
  permission: string
}

interface FarmData {
  id: string
  name: string
  cpf?: string
  cnpj?: string
}

interface PasswordData {
  id: string
  password: string
  oldPassword: string
}

interface SignInCredentials {
  cpf: string
  password: string
}

interface AuthContextData {
  user: UserData
  permissions: PermissionData
  farmId: string
  farm: FarmData
  isAuthenticated: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  onSelectFarm(data: string): Promise<void>
  updatePassword(data: PasswordData): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function signOut(ctx = undefined): void {
  destroyCookie(ctx, 'token')
  destroyCookie(ctx, 'farm')
  destroyCookie(ctx, 'farmId')
  destroyCookie(ctx, 'user')
  destroyCookie(ctx, 'permissions')
  Router.push('signin')
}

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserData>()
  const [permissions] = useState<PermissionData>()
  const [farmId, setFarmId] = useState<string>()
  const [farm, setFarm] = useState<FarmData>()
  const isAuthenticated = !!user

  useEffect(() => {
    console.log('entrou no primeiro use')
    const { token } = parseCookies()

    if (token) {
      const apiClient = setupAPIClient()
      apiClient
        .get('me')
        .then(response => {
          const { email, permission, roles, cpf, name, id } = response.data
          setUser({ email, permission, roles, cpf, name, id })
        })
        .catch(() => {
          console.log('erro no get me')
          // signOut()
        })
    } else {
      console.log('sem token')
      // signOut()
    }
  }, [])

  const signIn = useCallback(async ({ cpf, password }) => {
    const apiClient = setupAPIClient()
    const response = await apiClient.post('session', {
      cpf,
      password
    })

    setCookie(undefined, 'token', response.data.token, {
      maxAge: 60 * 60 * 24 * 60 // um dia
    })
    setCookie(undefined, 'user', JSON.stringify(response.data.user), {
      maxAge: 60 * 60 * 24 * 60 // um dia
    })

    const { email, permission, roles, name, id } = response.data.user
    setUser({ email, permission, roles, cpf, name, id })
    Router.push('/farms')
  }, [])

  const onSelectFarm = useCallback(async id => {
    setFarmId(id)
    console.log('entrou no select farm')
    setCookie(undefined, 'farmId', id, {
      maxAge: 60 * 60 * 24 * 60 // um dia
    })
    if (id) {
      try {
        const client = setupAPIClient()
        console.log('apiClient.defaults')
        console.log(client.defaults)
        const response = await client.get('farm', {
          params: {
            id
          }
        })
        const respFarm = response.data[0]
        console.log(respFarm)

        setCookie(undefined, 'farm', JSON.stringify(respFarm), {
          maxAge: 60 * 60 * 24 * 60 // um dia
        })

        const { name, cnpj, cpf } = respFarm
        setFarm({ name, id, cnpj, cpf })
      } catch (error) {
        console.log(error.response)
      }
    }
  }, [])

  const updatePassword = useCallback(async ({ id, password, oldPassword }) => {
    const apiClient = setupAPIClient()
    const responseUser = await apiClient.put('user', {
      id,
      password,
      old_password: oldPassword
    })

    setCookie(undefined, 'user', JSON.stringify(responseUser.data.user), {
      maxAge: 60 * 60 * 24 * 60 // 60 dias
    })

    const { email, permission, roles, name, cpf } = user
    setUser({ email, permission, roles, cpf, name, id })
  }, [])

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        permissions,
        farmId,
        farm,
        isAuthenticated,
        signIn,
        onSelectFarm,
        signOut,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth bost be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
