import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react'
import { parseCookies, setCookie } from 'nookies'
import { darkTheme, lightTheme } from '../styles/ThemeConfig'
interface PreferencesData {
  theme: string
}
interface PreferencesContextData {
  theme: string
  styleTheme: Record<string, Record<string, string>>
  setPreferences(preferences: PreferencesData): void
}

const PreferencesContext = createContext<PreferencesContextData>(
  {} as PreferencesContextData
)

const PreferencesProvider: React.FC = ({ children }) => {
  const [localTheme, setLocalTheme] = useState('dark')

  useEffect(() => {
    const { theme_agroapp } = parseCookies()
    setLocalTheme(theme_agroapp)
  }, [])

  const setPreferences = useCallback((preferences: PreferencesData) => {
    console.log(preferences)
    setCookie(undefined, 'theme_agroapp', preferences.theme, {
      maxAge: 60 * 60 * 24 * 1 // um dia
    })
    setLocalTheme(preferences.theme)
  }, [])

  return (
    <PreferencesContext.Provider
      value={{
        setPreferences,
        theme: localTheme,
        styleTheme: localTheme === 'light' ? lightTheme : darkTheme
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

function usePreferences(): PreferencesContextData {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error('useAuth bost be used within an AuthProvider')
  }
  return context
}

export { PreferencesProvider, usePreferences }
