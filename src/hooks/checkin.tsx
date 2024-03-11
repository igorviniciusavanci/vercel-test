import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { darkTheme, lightTheme } from '../styles/ThemeConfig'

interface CheckInData {
  id?: string
  user_id: string
  farm_id: string
  initial_date?: string
  patrimony_id: string
  final_date?: string
}
interface OffLineCheckInContextData {
  checkIn: CheckInData
  // styleTheme: Record<string, Record<string, string>>
  iniciateCheckIn(data: CheckInData): void
  checkOut(): void
}

const OffLineCheckInContext = createContext<OffLineCheckInContextData>(
  {} as OffLineCheckInContextData
)

const OffLineCheckInProvider: React.FC = ({ children }) => {
  const [localTheme, setLocalTheme] = useState('dark')
  const [checkIn, setCheckIn] = useState<CheckInData | undefined>(undefined)
  const [checkInList, setCheckInList] = useState<CheckInData[]>()

  useEffect(() => {
    const { check_in } = parseCookies()
    console.log('################')
    console.log(check_in)
    console.log('################')
    if (check_in) {
      console.log('entrou no if do use')
      setCheckIn(JSON.parse(check_in))
    }
  }, [])

  const iniciateCheckIn = useCallback((data: CheckInData) => {
    console.log(data)
    // setCookie(undefined, 'theme_agroapp', preferences.theme, {
    //   maxAge: 60 * 60 * 24 * 1 // um dia
    // })
    setCookie(undefined, 'check_in', JSON.stringify(data), {
      maxAge: 60 * 60 * 24 * 1 // um dia
    })
    setCheckIn(data)
  }, [])

  const checkOut = useCallback((ctx = undefined) => {
    destroyCookie(ctx, 'check_in')
    setCheckIn(undefined)
  }, [])

  return (
    <OffLineCheckInContext.Provider
      value={{
        iniciateCheckIn,
        checkIn: checkIn,
        checkOut
        // theme: localTheme,
        // styleTheme: localTheme === 'light' ? lightTheme : darkTheme
      }}
    >
      {children}
    </OffLineCheckInContext.Provider>
  )
}

function useOffLineCheckIn(): OffLineCheckInContextData {
  const context = useContext(OffLineCheckInContext)
  if (!context) {
    throw new Error('useOffLineCheckIn bost be used within an AuthProvider')
  }
  return context
}

export { OffLineCheckInProvider, useOffLineCheckIn }
