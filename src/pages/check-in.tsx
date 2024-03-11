import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { format } from 'date-fns'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { MdQrCode2 } from 'react-icons/md'
import {
  Container,
  Content,
  ConainerTitle
} from '../styles/pages/RegisterPages'
import Input from '../components/Input'
import ButtonCircle from '../components/ButtonCircle'
import Button from '../components/Button'
import Header from '../components/Header'
import { listMenusOparation } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import { useToast } from '../hooks/toast'
import { api } from '../server/apiClient'
import getValidationsErrors from '../utils/getValidationErrors'
import { useAuth } from '../hooks/auth'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import PatrimonyData from '../DTO/patrimonyDTO'
import SelectData from '../DTO/selectDTO'
import Select from '../components/Select'
import InputFile from '../components/InputFile'
import { useOffLineCheckIn } from '../hooks/checkin'

interface OperationCheckInProps {
  list: SelectData[]
}

const OperationCheckIn: React.FC<OperationCheckInProps> = ({ list }) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { user, farmId } = useAuth()
  const { iniciateCheckIn } = useOffLineCheckIn()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [selectedPatrimony, setSelectedPatrimony] = useState<SelectData>()
  const [loading, setLoading] = useState(false)
  const [listPatrimony, setListPatrimony] = useState(list || [])

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

  useEffect(() => {
    getListPatrimonyItens()
  }, [])

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const handleSubmit = useCallback(
    async (data: { patrimony: SelectData }) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        if (!selectedPatrimony) {
          const yupSchema = {
            patrimony: Yup.string().required('Patrimônio Obrigatório')
          }
          const schema = Yup.object().shape(yupSchema)

          await schema.validate(data, { abortEarly: false })
          return
        }
        const filds: Record<string, undefined> = {}
        Object.assign(filds, { patrimony_id: selectedPatrimony.value })
        const fDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')
        console.log(fDate)
        const response = await api.post('/checkin', {
          user_id: user.id,
          farm_id: farmId,
          initial_date: fDate,
          patrimony_item_id: selectedPatrimony.value
        })
        console.log(response.data)

        await iniciateCheckIn({
          id: response.data.id,
          user_id: user.id,
          farm_id: farmId,
          initial_date: fDate,
          patrimony_id: selectedPatrimony.value
        })
        formRef.current.reset()
        setSelectedPatrimony(null)
        setLoading(false)
        Router.push('/operation-dash')
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Check-in ralizado com sucesso! Bom trabalho.'
        })
      } catch (error) {
        setLoading(false)
        console.log(error.response)
        if (error instanceof Yup.ValidationError) {
          console.log(error)
          const errors = getValidationsErrors(error)
          formRef.current?.setErrors(errors)
          return
        }
        if (error.response && error.response.status === 401) {
          signOut()
          return
        }
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message
        ) {
          addToast({
            type: 'error',
            title: 'Ops!',
            description: `${error.response.data.message}`
          })

          return
        }
        if (error === 'Network Error') {
          addToast({
            type: 'error',
            title: 'Houve um erro ao tentar cadastrar grupo de patrimônio',
            description:
              'Sem conexão com o banco de dados, verifique seu acesso a internet e tente novamente.'
          })
          const fDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')
          await iniciateCheckIn({
            user_id: user.id,
            farm_id: farmId,
            initial_date: fDate,
            patrimony_id: selectedPatrimony.value
          })
          return
        }
        addToast({
          type: 'error',
          title: 'Ops!',
          description:
            'Houve um erro ao cadastrar grupo de patrimônio, tente novamente.'
        })
      }
    },
    [signOut, selectedPatrimony, user, farmId]
  )
  const handleChangePatrimony = useCallback(data => {
    if (data) {
      setSelectedPatrimony(data)
    } else {
      setSelectedPatrimony(null)
    }
  }, [])

  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Header profileIcon menuIcon onClickMenu={handleMenu}></Header>
      <MenuDrawer visible={menuVisible} listMenus={listMenusOparation} />
      <Content>
        <TitleRegisters>Check-in na máquina</TitleRegisters>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Dados para iniciar trabalho</span>
              </legend>
            </ConainerTitle>
            <div className="selectWithButton">
              <Select
                required
                label="Patrimônio"
                name="patrimony"
                placeholder=""
                isClearable
                options={list}
                value={selectedPatrimony}
                onChange={handleChangePatrimony}
              />
              <ButtonCircle
                type="button"
                className="scanQrCode"
                onClick={() => {
                  console.log('click')
                }}
              >
                <MdQrCode2 size="22px" />
              </ButtonCircle>
              {/* <InputFile capture></InputFile> */}
            </div>
          </fieldset>
          <div className="containerButton">
            <Button
              secundary
              title="Iniciar Trabalho"
              type="submit"
              loading={loading}
            />
          </div>
        </Form>
      </Content>
    </Container>
  )
}

export default OperationCheckIn
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
