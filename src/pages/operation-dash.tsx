import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { format } from 'date-fns'
import {
  Container,
  Content,
  ContainerShortcut,
  ContainerImage
} from '../styles/pages/DashPages'
import logo from '../assets/images/logodashbackgrounddark.png'
import logoLight from '../assets/images/logodashbackgroundlight.png'
import Header from '../components/Header'
import { listMenusOparation } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import { withSSRAuth } from '../hocs/withSSRAuth'
import CardShortcut from '../components/CardShortcut'
import { usePreferences } from '../hooks/preferences'
import { useOffLineCheckIn } from '../hooks/checkin'
import ButtonShortcut from '../components/ButtonShortcut'
import { useToast } from '../hooks/toast'
import { api } from '../server/apiClient'

const OperationDash: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false)
  const { addToast } = useToast()
  const { theme } = usePreferences()
  const { checkIn, checkOut } = useOffLineCheckIn()

  const [checkInData, setCheckInData] = useState(undefined)

  console.log({ checkIn })

  useEffect(() => {
    if (checkIn) {
      console.log('aqui')
      setCheckInData(checkIn)
    }
  }, [checkIn])

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const handleCheckOut = useCallback(async () => {
    if (checkIn.id) {
      console.log(checkIn)
      const fDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')
      console.log(fDate)
      const response = await api.put('/checkin', {
        id: checkIn.id,
        final_date: fDate
      })
      console.log(response.data)
      checkOut()
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Check-out ralizado com sucesso.'
      })
    } else {
      checkOut()
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Check-out ralizado com sucesso.'
      })
    }
  }, [checkIn])

  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Header menuIcon onClickMenu={handleMenu} profileIcon></Header>
      <MenuDrawer visible={menuVisible} listMenus={listMenusOparation} />
      <Content>
        <TitleRegisters>Módulo Operação</TitleRegisters>
        <ContainerShortcut>
          {/* <CardShortcut name="Check-in" path="check-in" /> */}
          {checkInData && checkInData.user_id ? (
            <>
              <ButtonShortcut
                name="Check-out"
                operation
                onClick={() => handleCheckOut()}
              />
              <CardShortcut name="Relatar" path="problem-register" />
            </>
          ) : (
            <CardShortcut name="Check-in" path="check-in" />
          )}
        </ContainerShortcut>
      </Content>
      <ContainerImage>
        <Image src={theme === 'light' ? logoLight : logo} alt="" priority />
      </ContainerImage>
    </Container>
  )
}

export default OperationDash
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
