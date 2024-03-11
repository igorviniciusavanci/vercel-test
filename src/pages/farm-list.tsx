import React, { useCallback, useEffect, useState } from 'react'
import { listMenusManagerAdm } from '../utils/menusOptions'
import Title from '../components/Title'
import Header from '../components/Header'
import MenuDrawer from '../components/MenuDrawer'
import {
  Container,
  Contant,
  ContainerTitle,
  ContainerButtonTitle
} from '../styles/pages/ListPages'
import { api } from '../server/apiClient'
import Table from '../components/Table'
import FarmData from '../DTO/farmDTO'
import { cnpjMask, cpfMask, phoneMask } from '../utils/Mask'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import Router, { useRouter } from 'next/router'
import { useAuth } from '../hooks/auth'
import Head from 'next/head'
import { usePreferences } from '../hooks/preferences'

const listTitle = ['Nome', 'Telefone', 'Razão Social', 'CPF', 'CNPJ']

interface FarmProps {
  list: FarmData[]
}

const Farms: React.FC<FarmProps> = ({ list }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const { permissions, signOut } = useAuth()
  const { theme } = usePreferences()
  const [listFarm, setListFarm] = useState(list || [])
  const router = useRouter()

  const getListFarm = useCallback(async () => {
    try {
      const responseUsers = await api.get('/farm')
      console.log(responseUsers.data)
      const list = responseUsers.data.map((data: FarmData) => {
        return {
          id: data.id,
          name: data.name,
          phone: phoneMask(data.phone),
          razao_social: data.razao_social,
          cpf: data.cpf ? cpfMask(data.cpf) : '',
          cnpj: data.cnpj ? cnpjMask(data.cnpj) : ''
        }
      })
      setListFarm(list)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signOut()
      }
    }
  }, [])

  const refreshData = () => {
    router.replace(router.asPath)
    getListFarm()
  }

  useEffect(() => {
    refreshData()
  }, [])

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])
  return (
    <Container>
      <Head>
        {/* <meta
          name="theme-color"
          content={`${theme === 'light' ? '#fff' : '#203038'}`}
        /> */}
        <title>AgroApp</title>
      </Head>
      <Header profileIcon menuIcon onClickMenu={handleMenu} />
      <MenuDrawer
        visible={menuVisible}
        listMenus={permissions ? listMenusManagerAdm(permissions) : []}
      />
      <Contant>
        <ContainerTitle>
          <Title>Lista de Fabricantes Cadastrados</Title>
          <ContainerButtonTitle>
            {/* <ButtonCircle secundary onClick={handleRegisterUser}>
              <FiPlus color="#fff" size="25px" />
            </ButtonCircle> */}
          </ContainerButtonTitle>
        </ContainerTitle>
        <Table
          listItens={listFarm}
          listTitle={listTitle}
          onClickItem={selected => {
            Router.push(`/farm-data?id=${selected}`)
          }}
        />
      </Contant>
    </Container>
  )
}

export default Farms
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/farm')
  const list = response.data.map((data: FarmData) => {
    return {
      id: data.id,
      name: data.name,
      phone: phoneMask(data.phone),
      razao_social: data.razao_social,
      cpf: data.cpf ? cpfMask(data.cpf) : '',
      cnpj: data.cnpj ? cnpjMask(data.cnpj) : ''
    }
  })
  return {
    props: { list }
  }
})
