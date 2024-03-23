import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'

import Theme from '../components/Theme'
import AppProvider from '../hooks'
import { usePreferences } from '../hooks/preferences'
import { ToastProvider } from '../hooks/toast'
import { darkTheme } from '../styles/ThemeConfig'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const { styleTheme, theme } = usePreferences()
  const [, setSelectedTheme] = useState(styleTheme || darkTheme)

  useEffect(() => {
    setSelectedTheme(styleTheme || darkTheme)
  }, [theme])

  return (
    <AppProvider>
      <ToastProvider>
        <Theme Component={Component} pageProps={pageProps} router={router} />
      </ToastProvider>
    </AppProvider>
  )
}

export default MyApp
