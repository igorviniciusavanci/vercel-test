import Head from 'next/head'
import React from 'react'

import { withSSRAuth } from '../hocs/withSSRAuth'
import { Container, Content } from '../styles/pages/Dashboard'

// interface HomeProps extends ResponseMe {
//   listPermissions: PermissionData[]
// }

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Content>
        <h1>oi</h1>
      </Content>
    </Container>
  )
}

export default Home
export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  }
})
