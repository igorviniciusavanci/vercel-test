import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { format } from 'date-fns'
import Router from 'next/router'
import { MdQrCode2 } from 'react-icons/md'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import {
  Container,
  Content,
  ConainerTitle
} from '../styles/pages/RegisterPages'
import Input from '../components/Input'
import Button from '../components/Button'
import Header from '../components/Header'
import { listMenusManagerAdm, listMenusOparation } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import getValidationsErrors from '../utils/getValidationErrors'
import { useToast } from '../hooks/toast'
import { api } from '../server/apiClient'
import { useAuth } from '../hooks/auth'
import { withSSRAuth } from '../hocs/withSSRAuth'
import Select from '../components/Select'
import ButtonCircle from '../components/ButtonCircle'
import SelectData from '../DTO/selectDTO'
import PatrimonyData from '../DTO/patrimonyDTO'
import { setupAPIClient } from '../server/api'
interface ProblemRegisterProps {
  list: SelectData[]
}

const ProblemRegister: React.FC<ProblemRegisterProps> = ({ list }) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { permissions, signOut, user, farmId } = useAuth()
  const [loading, setLoading] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [listPatrimony, setListPatrimony] = useState(list || [])

  const [selectedPatrimony, setSelectedPatrimony] = useState<SelectData>()

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
        const fDate = format(new Date(), 'yyyy-MM-dd')

        // await api.post('/patrimonygroup', { name: data.name })
        Router.push('problem-register-items')
        formRef.current.reset()
        setSelectedPatrimony(null)
        setLoading(false)

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Informe iniciado com sucesso.'
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
        <TitleRegisters>Informe de Problema</TitleRegisters>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Dados da Máquina/Equipamento</span>
              </legend>
            </ConainerTitle>
            <div className="selectWithButton">
              <Select
                required
                label="Patrimônio"
                name="patrimony"
                placeholder=""
                isClearable
                options={listPatrimony}
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
              title="Continuar"
              type="submit"
              loading={loading}
            />
          </div>
        </Form>
      </Content>
    </Container>
  )
}

export default ProblemRegister
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
