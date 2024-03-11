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
import ManufacturerData from '../DTO/manufacturerDTO'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '../hooks/auth'

const listTitle = ['Fabricante']

interface ManufacturersProps {
  list: ManufacturerData[]
}

const Manufacturers: React.FC<ManufacturersProps> = ({ list }) => {
  const router = useRouter()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [listManufacturer, setListManufacturer] = useState(list || [])

  const getListManufacturer = useCallback(async () => {
    try {
      const responseUsers = await api.get('/manufacturer')
      const list = responseUsers.data.map((data: ManufacturerData) => {
        return {
          id: data.id,
          name: data.name
        }
      })
      setListManufacturer(list)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signOut()
      }
    }
  }, [signOut])
  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const refreshData = () => {
    router.replace(router.asPath)
    getListManufacturer()
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <Container>
      <Head>
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
          listItens={listManufacturer}
          listTitle={listTitle}
          onClickItem={selected => {
            Router.push(`/manufacturer-data?id=${selected}`)
          }}
        />
      </Contant>
    </Container>
  )
}

export default Manufacturers
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/manufacturer')
  const list = response.data.map((data: ManufacturerData) => {
    return {
      id: data.id,
      name: data.name
    }
  })
  return {
    props: { list }
  }
})
