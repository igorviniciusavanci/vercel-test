import axios, { AxiosError, AxiosInstance } from 'axios'
import { parseCookies } from 'nookies'
import { signOut } from '../hooks/auth'

export function setupAPIClient(ctx = undefined): AxiosInstance {
  const cookies = parseCookies(ctx)
  const api = axios.create({
    // baseURL: 'https://api.agroappbrasil.com.br/'
    baseURL: 'https://3333-dexatec-agroserver-qx80mcp6eeb.ws-us77.gitpod.io/'
  })
  if (cookies['token']) {
    console.log('entrou no token $$$$$$')
    api.defaults.headers.common['Authorization'] = `Bearer ${cookies['token']}`
  }
  if (cookies['farmId']) api.defaults.headers.common['farm'] = cookies['farmId']

  // api.interceptors.response.use(
  //   response => {
  //     return response
  //   },
  //   (error: AxiosError) => {
  //     console.log(error.response)
  //     console.log('error intercept')
  //     if (error.response.data?.code === 401) {
  //       signOut()
  //     }
  //     return Promise.reject(error)
  //   }
  // )

  return api
}
