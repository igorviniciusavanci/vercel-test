import React from 'react'
import Head from 'next/head'
import { Container } from '../styles/pages/Home'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import ResponseMe from '../server/responseType/me'
import ToggleButton from '../components/ToggleButton'
import { usePreferences } from '../hooks/preferences'

const Settings: React.FC<ResponseMe> = props => {
  const { setPreferences, theme } = usePreferences()

  const toggleTheme = () => {
    theme === 'light'
      ? setPreferences({ theme: 'dark' })
      : setPreferences({ theme: 'light' })
  }
  return (
    <Container>
      <Head>
        <title>Next</title>
      </Head>

      <ToggleButton onChange={toggleTheme}></ToggleButton>
    </Container>
  )
}

export default Settings

export const getServerSideProps = withSSRAuth<ResponseMe>(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('me')
  console.log(response.data)
  const { cpf, name, email, id, owner_id } = response.data
  return {
    props: {
      id,
      cpf,
      name,
      email,
      owner_id
    }
  }
})
