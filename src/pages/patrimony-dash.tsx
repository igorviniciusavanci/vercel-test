import React, { useCallback, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import {
  Container,
  Content,
  ContainerImage,
  ContainerShortcut
} from '../styles/pages/DashPages'
import logo from '../assets/images/logodashbackgrounddark.png'
import logoLight from '../assets/images/logodashbackgroundlight.png'
import Header from '../components/Header'
import { listMenusPatrimony } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { usePreferences } from '../hooks/preferences'
import CardShortcut from '../components/CardShortcut'

const PatrimonyDash: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false)
  const { theme } = usePreferences()

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Header menuIcon onClickMenu={handleMenu} profileIcon></Header>
      <MenuDrawer visible={menuVisible} listMenus={listMenusPatrimony} />
      <Content>
        <TitleRegisters>Módulo Patrimônio</TitleRegisters>
        <ContainerShortcut>
          <CardShortcut name="Gerar QR" path="patrimony-qrcode" />
        </ContainerShortcut>
      </Content>
      <ContainerImage>
        <Image src={theme === 'light' ? logoLight : logo} alt="" priority />
      </ContainerImage>
    </Container>
  )
}

export default PatrimonyDash
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
