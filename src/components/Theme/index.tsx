import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { usePreferences } from '../../hooks/preferences'
import { darkTheme, GlobalStyles } from '../../styles/ThemeConfig'

const Theme: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { styleTheme, theme } = usePreferences()
  const [selectedTheme, setSelectedTheme] = useState(styleTheme || darkTheme)

  useEffect(() => {
    setSelectedTheme(styleTheme || darkTheme)
  }, [theme])
  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default Theme
