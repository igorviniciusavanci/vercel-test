import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'

import { darkTheme } from '../styles/ThemeConfig'
import AppProvider from '../hooks'
import { usePreferences } from '../hooks/preferences'
import Theme from '../components/Theme'
import { ToastProvider } from '../hooks/toast'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const { styleTheme, theme } = usePreferences()
  const [selectedTheme, setSelectedTheme] = useState(styleTheme || darkTheme)

  useEffect(() => {
    setSelectedTheme(styleTheme || darkTheme)
  }, [theme])

  return (
    <AppProvider>
      <ToastProvider>
        <Theme
          Component={Component}
          pageProps={pageProps}
          router={router}
        ></Theme>
      </ToastProvider>
    </AppProvider>
  )
}

export default MyApp
