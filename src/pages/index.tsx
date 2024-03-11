import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { Container, Content } from '../styles/pages/Dashboard'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import ResponseMe from '../server/responseType/me'
import CardDashboard from '../components/CardDashboard'
import Header from '../components/Header'
import { useAuth } from '../hooks/auth'
import PermissionData from '../DTO/permissionData'
import { api } from '../server/apiClient'
import { usePreferences } from '../hooks/preferences'

// interface HomeProps extends ResponseMe {
//   listPermissions: PermissionData[]
// }

const Home: React.FC = () => {
  const { farmId, user, permissions } = useAuth()
  const { theme } = usePreferences()
  const [loading, setLoading] = useState(true)
  const [permission, setPermission] = useState<PermissionData>()

  const getAdmCard = useCallback(() => {
    if (
      permissions &&
      (permissions.p_farm > 0 ||
        permissions.p_manufacture > 0 ||
        permissions.p_patrimony_group > 0 ||
        permissions.p_patrimony_item > 0 ||
        permissions.p_user > 0)
    ) {
      return <CardDashboard name="Administrativo" path="admin-dash" />
    }
  }, [farmId, permissions])

  const getSettingsCard = useCallback(() => {
    if (permissions) {
      if (permissions.p_permission > 0) {
        return <CardDashboard name="Configurações" path="settings-dash" />
      }
    }
  }, [farmId, permissions])

  const getPatrimonyCard = useCallback(() => {
    if (permissions) {
      if (permissions.p_patrimony_item & 1) {
        return <CardDashboard name="Patrimônio" path="patrimony-dash" />
      }
    }
  }, [farmId, permissions])

  useEffect(() => {
    getAdmCard()
    getSettingsCard()
    getPatrimonyCard()
  }, [farmId, getAdmCard, getSettingsCard, getPatrimonyCard])

  return (
    <Container>
      <Head>
        {/* <meta
          name="theme-color"
          content={`${theme === 'light' ? '#fff' : '#203038'}`}
        /> */}
        {/* <meta
          name="apple-mobile-web-app-status-bar-style"
          content={`${theme === 'light' ? 'default' : 'black-translucent'}`}
        ></meta> */}
        <title>AgroApp</title>
      </Head>
      <Header profileIcon />
      <Content>
        {farmId && (
          <>
            {getAdmCard()}
            {getPatrimonyCard()}
            <CardDashboard name="Operação" path="operation-dash" disabled />
            <CardDashboard name="Manutenção" path="maintenance-dash" disabled />
            <CardDashboard name="Relatórios" path="report-dash" disabled />
            <CardDashboard name="Suporte" path="help-dash" disabled />
            {/* <CardDashboard name="Usuario" path="user-register" />
            <CardDashboard name="Fazenda" path="/farm-register" />
            <CardDashboard name="Gestão" path="/" />
            <CardDashboard name="Gestão" path="/" /> */}
            {getSettingsCard()}
          </>
        )}
      </Content>
    </Container>
  )
}

export default Home
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
