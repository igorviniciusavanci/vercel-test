import React from 'react'
import Head from 'next/head'
import { Container, Content } from '../styles/pages/Farms'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import CardFarms from '../components/CardFarms'
import Header from '../components/Header'
import PermissionData from '../DTO/permissionData'
import { cnpjMask, cpfMask } from '../utils/Mask'
import { parseCookies } from 'nookies'

interface FarmsProps {
  listPermissions: PermissionData[]
}

const Farms: React.FC<FarmsProps> = props => {
  return (
    <Container>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header menuIcon profileIcon />
      <Content>
        {props.listPermissions &&
          props.listPermissions.map(item => {
            return (
              <CardFarms
                key={item.id}
                name={item.farm.name}
                cpf={item.farm.cpf ? cpfMask(item.farm.cpf) : null}
                cnpj={item.farm.cnpj ? cnpjMask(item.farm.cnpj) : null}
                id={item.farm_id}
              />
            )
          })}
      </Content>
    </Container>
  )
}

export default Farms

export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const cookies = parseCookies(ctx)
  const userData = JSON.parse(cookies.user)
  let listPermissions = []
  try {
    const responsePermissions = await apiClient.get('permission', {
      params: {
        user_id: userData.id
      }
    })
    listPermissions = responsePermissions.data
    console.log(listPermissions)
  } catch (error) {
    console.log('error na tela de lista de fazendas')
  }

  return {
    props: {
      listPermissions
    }
  }
})
