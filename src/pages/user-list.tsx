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
import { cpfMask, phoneMask, removeMask } from '../utils/Mask'
import Table from '../components/Table'
import User from '../DTO/userDTO'
import moment from 'moment'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import { api } from '../server/apiClient'
import Router, { useRouter } from 'next/router'
import { useAuth } from '../hooks/auth'

const listTitle = ['Nome', 'Nascimento', 'CPF', 'Telefone', 'E-mail']

interface UsersProps {
  list: User[]
}

const Users: React.FC<UsersProps> = ({ list }) => {
  const router = useRouter()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [listUsers, setListUsers] = useState(list || [])
  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const getListUsers = useCallback(async () => {
    try {
      const responseUsers = await api.get('/user')
      console.log(responseUsers.data)
      const list = responseUsers.data.map((userData: User) => {
        return {
          id: userData.id,
          name: userData.name,
          birthday: userData.birthday
            ? moment(userData.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY')
            : '',
          cpf: cpfMask(userData.cpf),
          phone: userData.phone ? phoneMask(removeMask(userData.phone)) : '',
          email: userData.email || ''
        }
      })
      setListUsers(list)
      console.log(list)
    } catch (error) {
      if (
        error.response &&
        error.response.status &&
        error.response.status === 401
      ) {
        signOut()
      }
    }
  }, [])

  useEffect(() => {
    router.replace(router.asPath)
    getListUsers()
  }, [getListUsers])
  return (
    <Container>
      <Header profileIcon menuIcon onClickMenu={handleMenu} />
      <MenuDrawer
        visible={menuVisible}
        listMenus={permissions ? listMenusManagerAdm(permissions) : []}
      />
      <Contant>
        <ContainerTitle>
          <Title>Lista de Pessoas Cadastradas</Title>
          <ContainerButtonTitle>
            {/* <ButtonCircle secundary onClick={handleRegisterUser}>
              <FiPlus color="#fff" size="25px" />
            </ButtonCircle> */}
          </ContainerButtonTitle>
        </ContainerTitle>
        <Table
          listItens={listUsers}
          listTitle={listTitle}
          onClickItem={selected => {
            Router.push(`/user-data?id=${selected}`)
          }}
        />
      </Contant>
    </Container>
  )
}

export default Users
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  try {
    const responseUsers = await apiClient.get('/user')
    const list = responseUsers.data.map((userData: User) => {
      return {
        id: userData.id,
        name: userData.name,
        birthday: userData.birthday
          ? moment(userData.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY')
          : '',
        cpf: cpfMask(userData.cpf),
        phone: userData.phone ? phoneMask(removeMask(userData.phone)) : '',
        email: userData.email || ''
      }
    })
    return {
      props: { list }
    }
  } catch (error) {
    return {
      props: { list: [] }
    }
  }
})
