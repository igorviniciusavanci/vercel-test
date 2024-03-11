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
import PatrimonyGroupData from '../DTO/patrimonyGroupDTO'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '../hooks/auth'
const listTitle = ['Descrição']
interface PatrimonyGroupProps {
  list: PatrimonyGroupData[]
}
const PatrimonyGroup: React.FC<PatrimonyGroupProps> = ({ list }) => {
  const router = useRouter()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [listPatrimonyGroup, setListPatrimonyGroup] = useState(list || [])

  const getListPatrimonyGroup = useCallback(async () => {
    try {
      const responseUsers = await api.get('/patrimonygroup')
      const list = responseUsers.data.map((data: PatrimonyGroupData) => {
        return {
          id: data.id,
          name: data.name
        }
      })
      setListPatrimonyGroup(list)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signOut()
      }
    }
  }, [signOut])
  const refreshData = () => {
    router.replace(router.asPath)
    getListPatrimonyGroup()
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
        <title>AgroApp</title>
      </Head>
      <Header profileIcon menuIcon onClickMenu={handleMenu}></Header>
      <MenuDrawer
        visible={menuVisible}
        listMenus={permissions ? listMenusManagerAdm(permissions) : []}
      />
      <Contant>
        <ContainerTitle>
          <Title>Lista de Grupos de Patrimônio Cadastrados</Title>
          <ContainerButtonTitle>
            {/* <ButtonCircle secundary onClick={handleRegisterUser}>
              <FiPlus color="#fff" size="25px" />
            </ButtonCircle> */}
          </ContainerButtonTitle>
        </ContainerTitle>
        <Table
          listItens={listPatrimonyGroup}
          listTitle={listTitle}
          onClickItem={selected => {
            Router.push(`/patrimony-group-data?id=${selected}`)
          }}
        />
      </Contant>
    </Container>
  )
}

export default PatrimonyGroup
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/patrimonygroup')
  const list = response.data.map((data: PatrimonyGroupData) => {
    return {
      id: data.id,
      name: data.name
    }
  })
  return {
    props: { list }
  }
})
