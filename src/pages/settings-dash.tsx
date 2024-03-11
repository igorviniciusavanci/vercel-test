import React, { useCallback, useState } from 'react'
import Head from 'next/head'
import {
  Container,
  Content,
  ContainerImage,
  ContainerShortcut
} from '../styles/pages/DashPages'
import Image from 'next/image'
import logo from '../assets/images/logodashbackgrounddark.png'
import logoLight from '../assets/images/logodashbackgroundlight.png'
import { listMenusSettings } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import Header from '../components/Header'
import { useAuth } from '../hooks/auth'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { usePreferences } from '../hooks/preferences'
import CardShortcut from '../components/CardShortcut'

const UserRegister: React.FC = () => {
  const { permissions } = useAuth()
  const { theme } = usePreferences()
  const [menuVisible, setMenuVisible] = useState(false)

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

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
        <TitleRegisters>Módulo Configurações e Parâmetros</TitleRegisters>
        <ContainerShortcut>
          {permissions && permissions.p_permission & 2 ? (
            <CardShortcut
              name="Criar Permissão"
              path="create-access-permissions"
            />
          ) : null}
          {permissions && permissions.p_permission & 1 ? (
            <CardShortcut
              name="Permissão de Usuários"
              path="user-permissions"
            />
          ) : null}
        </ContainerShortcut>
      </Content>
      <ContainerImage>
        <Image src={theme === 'light' ? logoLight : logo} alt="" priority />
      </ContainerImage>
    </Container>
  )
}

export default UserRegister
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
