import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react'
import { setupAPIClient } from '../server/api'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Router from 'next/router'
import PermissionData from '../DTO/permissionData'
import { AxiosInstance } from 'axios'

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

interface AuthState {
  token: string
  user: UserData
}

interface SignInCredentials {
  cpf: string
  password: string
}

interface SignInFarmData {
  id: string
  farmId: string
}

interface AuthContextData {
  user: UserData
  permissions: PermissionData
  farmId: string
  farm: FarmData
  isAuthenticated: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  onSelectFarm(data: string): Promise<void>
  onChangeFarmPermissions(data: SignInFarmData): Promise<void>
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
  const [permissions, setPermissions] = useState<PermissionData>()
  const [farmId, setFarmId] = useState<string>()
  const [farm, setFarm] = useState<FarmData>()
  const isAuthenticated = !!user

  useEffect(() => {
    console.log('entrou no primeiro use')
    const { token, farmId, farm, permissions } = parseCookies()

    if (farmId) {
      setFarmId(farmId)
    }
    if (farm) {
      setFarm(JSON.parse(farm))
    }
    if (permissions) {
      setPermissions(JSON.parse(permissions))
    }

    if (token) {
      const apiClient = setupAPIClient()
      apiClient
        .get('me')
        .then(response => {
          const { email, permission, roles, cpf, name, id } = response.data
          setUser({ email, permission, roles, cpf, name, id })

          if (farmId) {
            apiClient
              .get('permission', {
                params: {
                  user_id: id
                }
              })
              .then(responsePermissions => {
                const filtered = responsePermissions.data.filter(item => {
                  if (item.farm_id === farmId) return item
                })
                if (filtered.length > 0) {
                  setPermissions(filtered[0])
                }
              })
              .catch(() => {
                console.log('erro no cacth do permission')
                // signOut()
              })
          }
        })
        .catch(() => {
          console.log('erro no get me')
          // signOut()
        })
    } else {
      console.log('sem token')
      // signOut()
    }
    // if (farmId) {
    //   api
    //     .get('farm', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         farm: farmId
    //       },
    //       params: {
    //         farmId
    //       }
    //     })
    //     .then(response => {
    //       const respFarm = response.data[0]
    //       setCookie(undefined, 'farm', JSON.stringify(respFarm), {
    //         maxAge: 60 * 60 * 24 * 1 // um dia
    //       })
    //       const { name, id, cnpj, cpf } = respFarm
    //       setFarm({ name, id, cnpj, cpf })
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       console.log('sem fazenda primeiro use')
    //     })
    // }
  }, [])

  const signIn = useCallback(async ({ cpf, password }) => {
    const apiClient = setupAPIClient()
    const response = await apiClient.post('session', {
      cpf,
      password
    })

    const { token, user } = response.data
    setCookie(undefined, 'token', token, {
      maxAge: 60 * 60 * 24 * 60 // um dia
    })
    setCookie(undefined, 'user', JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 60 // um dia
    })

    const { email, permission, roles, name, id } = user
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

  const onChangeFarmPermissions = useCallback(async ({ id, farmId }) => {
    console.log('entrou no change farm')
    if (farmId) {
      const client = setupAPIClient()
      const response = await client.get('permission', {
        params: {
          user_id: id
        }
      })
      const filtered = response.data.filter(item => {
        if (item.farm_id === farmId) return item
      })
      if (filtered.length > 0) {
        setPermissions(filtered[0])
        setCookie(undefined, 'permissions', JSON.stringify(filtered[0]), {
          maxAge: 60 * 60 * 24 * 60 // um dia
        })
      }
    }
    //
  }, [])

  const updatePassword = useCallback(async ({ id, password, oldPassword }) => {
    const apiClient = setupAPIClient()
    const responseUser = await apiClient.put('user', {
      id,
      password,
      old_password: oldPassword
    })
    const user = responseUser.data

    setCookie(undefined, 'user', JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 60 // 60 dias
    })

    const { email, permission, roles, name, cpf } = user
    setUser({ email, permission, roles, cpf, name, id })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: user,
        permissions: permissions,
        farmId: farmId,
        farm: farm,
        isAuthenticated,
        signIn,
        onSelectFarm,
        signOut,
        updatePassword,
        onChangeFarmPermissions
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
