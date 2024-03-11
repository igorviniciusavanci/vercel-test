import React from 'react'

import { AuthProvider } from './auth'
import { OffLineCheckInProvider } from './checkin'
import { PreferencesProvider } from './preferences'

const AppProvider: React.FC = ({ children }) => {
  return (
    <PreferencesProvider>
      <AuthProvider>
        <OffLineCheckInProvider>{children}</OffLineCheckInProvider>
      </AuthProvider>
    </PreferencesProvider>
  )
}

export default AppProvider
