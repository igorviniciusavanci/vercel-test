import React, { useCallback, useState } from 'react'
import Head from 'next/head'
import {
  Container,
  Content,
  Item,
  UserData,
  Name,
  Cpf,
  ContainerButtons
} from '../styles/pages/UserPermissions'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { listMenusSettings } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import Header from '../components/Header'
import ButtonCircle from '../components/ButtonCircle'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import User from '../DTO/userDTO'
import { cpfMask } from '../utils/Mask'
import Router, { useRouter } from 'next/router'
import { useAuth } from '../hooks/auth'

interface UserPermissionsProps {
  listUsers: User[]
}

const UserPermissions: React.FC<UserPermissionsProps> = ({ listUsers }) => {
  const router = useRouter()
  const { permissions } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [list, setList] = useState(listUsers)

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  // const handleRemoveAllPermissions = useCallback(
  //   async permission => {
  //     try {
  //       permission.forEach(element => {
  //         await api.delete('permission', {
  //           params: { id: element.id }
  //         })
  //       })

  //       history.back()
  //       addToast({
  //         type: 'success',
  //         title: 'Permissão excluída com sucesso'
  //       })
  //     } catch (error) {
  //       console.log(error.response)
  //     }
  //   },
  //   [getListUserPermissions]
  // )

  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Header menuIcon onClickMenu={handleMenu} profileIcon></Header>
      <MenuDrawer
        visible={menuVisible}
        listMenus={permissions ? listMenusSettings(permissions) : []}
      />
      <Content>
        {list.map(item => {
          return (
            <Item
              key={item.id}
              onClick={() => {
                Router.push(
                  `edit-access-permissions?id=${item.id}&edit=${false}`
                )
              }}
            >
              <UserData>
                <Name>{item.name}</Name>
                <Cpf>{cpfMask(item.cpf)}</Cpf>
              </UserData>
              <ContainerButtons>
                {permissions && permissions.p_permission & 4 && (
                  <ButtonCircle
                    className="edit"
                    onClick={() => {
                      Router.push(
                        `edit-access-permissions?id=${item.id}&edit=${false}`
                      )
                    }}
                  >
                    <AiOutlineEdit size={20}></AiOutlineEdit>
                  </ButtonCircle>
                )}

                {/* <ButtonCircle className="remove">
                  <AiOutlineDelete size={20}></AiOutlineDelete>
                </ButtonCircle> */}
              </ContainerButtons>
            </Item>
          )
        })}
      </Content>
    </Container>
  )
}

export default UserPermissions
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const responseUsers = await apiClient.get('/user', {
    params: {
      haspermission: true
    }
  })

  const listUsers = responseUsers.data.map((data: User) => {
    return { id: data.id, name: data.name, cpf: data.cpf }
  })
  return {
    props: { listUsers }
  }
})
