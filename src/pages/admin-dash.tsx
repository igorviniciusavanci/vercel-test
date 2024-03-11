import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {
  Container,
  Content,
  ContainerImage,
  ContainerShortcut
} from '../styles/pages/DashPages'
import Header from '../components/Header'
import { listMenusManagerAdm } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import logo from '../assets/images/logodashbackgrounddark.png'
import logoLight from '../assets/images/logodashbackgroundlight.png'
import { useAuth } from '../hooks/auth'
import { usePreferences } from '../hooks/preferences'
import { withSSRAuth } from '../hocs/withSSRAuth'
import CardShortcut from '../components/CardShortcut'

const AdminDashboard: React.FC = () => {
  const { permissions } = useAuth()
  const { theme } = usePreferences()
  const [menuVisible, setMenuVisible] = useState(false)
  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  // const getPermissions = useCallback(async () => {
  //   setLoading(true)
  //   try {
  //     const responsePermissions = await api.get('permission', {
  //       params: {
  //         user_id: user.id
  //       }
  //     })

  //     const listPermissions = responsePermissions.data
  //     const filtered = listPermissions.filter(item => {
  //       if (item.farm_id === farmId) return item
  //     })
  //     if (filtered.length > 0) {
  //       setPermission(filtered[0])
  //     }
  //     setLoading(false)
  //   } catch (error) {
  //     console.log(error)
  //     setLoading(false)
  //   }
  // }, [user, farmId])

  useEffect(() => {
    console.log('reload')
  }, [permissions])

  return (
    <Container>
      <Head>
        {/* <meta
          name="theme-color"
          content={`${theme === 'light' ? '#fff' : '#203038'}`}
        /> */}
        <title>AgroApp</title>
      </Head>
      <Header menuIcon onClickMenu={handleMenu} profileIcon></Header>
      <MenuDrawer
        visible={menuVisible}
        listMenus={permissions ? listMenusManagerAdm(permissions) : []}
      />
      <Content>
        <TitleRegisters>Módulo Administrativo</TitleRegisters>
        <ContainerShortcut>
          {permissions && permissions.p_user & 1 ? (
            <CardShortcut name="Usuários" path="user-list" />
          ) : null}
          {permissions && permissions.p_farm & 1 ? (
            <CardShortcut name="Fazendas" path="farm-list" />
          ) : null}
          {permissions && permissions.p_manufacture & 1 ? (
            <CardShortcut name="Fabricantes" path="manufacturer-list" />
          ) : null}
          {permissions && permissions.p_patrimony_item & 1 ? (
            <CardShortcut name="Patrimônios" path="patrimony-list" />
          ) : null}
        </ContainerShortcut>
      </Content>
      <ContainerImage>
        <Image src={theme === 'light' ? logoLight : logo} alt="" priority />
      </ContainerImage>
    </Container>
  )
}

export default AdminDashboard
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
