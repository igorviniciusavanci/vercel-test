import React, { useCallback, useState } from 'react'
import Head from 'next/head'
import { Container, Content } from '../styles/pages/DashPages'

import Header from '../components/Header'
import { listMenusExemple } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import { withSSRAuth } from '../hocs/withSSRAuth'

const ReportDash: React.FC = () => {
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
      <MenuDrawer visible={menuVisible} listMenus={listMenusExemple} />
      <Content>
        <TitleRegisters>Dash Report</TitleRegisters>
      </Content>
    </Container>
  )
}

export default ReportDash
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
