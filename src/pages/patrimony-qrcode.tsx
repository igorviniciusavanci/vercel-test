import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import {
  Container,
  Content,
  ContainerTitle,
  ContainerQR
} from '../styles/pages/PatrimonyQrCode'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { BsFilter, BsFillPrinterFill } from 'react-icons/bs'
import { AiFillPrinter } from 'react-icons/ai'

// import { ComponentToPrint } from './ComponentToPrint'

import Header from '../components/Header'
import { listMenusPatrimony } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import Filter from '../components/Filter'
import Button from '../components/Button'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import PatrimonyData from '../DTO/patrimonyDTO'
import SelectData from '../DTO/selectDTO'
import getValidationsErrors from '../utils/getValidationErrors'
import { useToast } from '../hooks/toast'
import Select from '../components/Select'
import ButtonCircle from '../components/ButtonCircle'
import QRCode from 'react-qr-code'
import Image from 'next/image'
import logoImage from '../assets/images/agrologo.png'
import { useAuth } from '../hooks/auth'
import { api } from '../server/apiClient'

interface PatrimonyProps {
  list: SelectData[]
}

interface FormDataGenerator {
  patrimony: { value: string; label: string }
}

const PatrimonyQrCode: React.FC<PatrimonyProps> = ({ list }) => {
  const formRef = useRef<FormHandles>(null)
  const { signOut } = useAuth()
  const { addToast } = useToast()
  const [menuVisible, setMenuVisible] = useState(false)
  const [filterVisible, setFilterVisible] = useState(true)
  const [selectedPatrimony, setSelectedPatrimony] = useState({} as SelectData)
  const [loading, setLoading] = useState(false)
  const [listPatrimony, setListPatrimony] = useState(list || [])
  const [QRVisible, setQRVisible] = useState(false)
  const getListPatrimonyItens = useCallback(async () => {
    try {
      const responsePatrimony = await api.get('/patrimonyitem')
      const list = responsePatrimony.data.map((data: PatrimonyData) => {
        return { value: data.id, label: data.name }
      })
      setListPatrimony(list)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signOut()
      }
    }
  }, [signOut])

  const getPDF = useCallback(async () => {
    try {
      const docResult = await api.get('/patrimonyitem/qrcode', {
        responseType: 'blob'
      })
      console.log(docResult)
      const url = window.URL.createObjectURL(new Blob([docResult.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.pdf') // or any other extension
      document.body.appendChild(link)
      link.click()
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 401) {
        signOut()
      }
    }
  }, [signOut])
  useEffect(() => {
    getListPatrimonyItens()
  }, [])

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const handleFilter = useCallback(() => {
    setFilterVisible(oldValue => !oldValue)
  }, [])

  const handleChangePatrimony = useCallback(data => {
    if (data) {
      setSelectedPatrimony(data)
      setFilterVisible(false)
    }
    setQRVisible(false)
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      setFilterVisible(false)
      setSelectedPatrimony({} as SelectData)
      setQRVisible(true)
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Ops!',
        description: 'Houve um erro ao gerar QR Code, tente novamente.'
      })
    }
  }, [])
  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Header profileIcon menuIcon onClickMenu={handleMenu}></Header>
      <MenuDrawer visible={menuVisible} listMenus={listMenusPatrimony} />
      <Content>
        <ContainerTitle>
          <TitleRegisters>QR Code - AgroApp</TitleRegisters>
          <ButtonCircle type="button" onClick={handleFilter}>
            <BsFilter size="22px" />
          </ButtonCircle>
        </ContainerTitle>
        {filterVisible && (
          <Filter>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Select
                label="Patrimônio"
                name="patrimony"
                placeholder=""
                isClearable
                options={list}
                onChange={handleChangePatrimony}
              />
              <div className="containerButton">
                <Button loading={loading} title="Gerar QR para todos" />
                <button
                  className="print"
                  type="button"
                  onClick={() => getPDF()}
                >
                  <BsFillPrinterFill size="20px" />
                </button>
              </div>
            </Form>
          </Filter>
        )}

        {selectedPatrimony && selectedPatrimony.value && (
          <ContainerQR>
            {/* <strong>{selectedPatrimony.label}</strong> */}
            <div className="containerQR">
              <strong>{selectedPatrimony.label}</strong>
              <QRCode value={selectedPatrimony.value} />
              <div className="logo">
                <Image src={logoImage} width="110" height="70" priority />
              </div>
            </div>
          </ContainerQR>
        )}
        {QRVisible &&
          listPatrimony.map((item: SelectData) => {
            return (
              <ContainerQR key={item.value} className="qr">
                <div className="containerQR">
                  <strong>{item.label}</strong>
                  <QRCode value={item.value} />
                  <div className="logo">
                    <Image src={logoImage} width="110" height="70" />
                  </div>
                </div>
              </ContainerQR>
            )
          })}
      </Content>
    </Container>
  )
}

export default PatrimonyQrCode
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const responsePatrimony = await apiClient.get('/patrimonyitem')

  const list = responsePatrimony.data.map((data: PatrimonyData) => {
    return { value: data.id, label: data.name }
  })
  return {
    props: { list }
  }
})
