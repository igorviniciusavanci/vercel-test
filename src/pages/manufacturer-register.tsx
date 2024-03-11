import React, { useCallback, useRef, useState } from 'react'
import Head from 'next/head'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import {
  Container,
  Content,
  ConainerTitle
} from '../styles/pages/RegisterPages'
import Input from '../components/Input'
import Button from '../components/Button'
import Header from '../components/Header'
import { listMenusManagerAdm } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import getValidationsErrors from '../utils/getValidationErrors'
import { useToast } from '../hooks/toast'
import { api } from '../server/apiClient'
import { useAuth } from '../hooks/auth'
import { withSSRAuth } from '../hocs/withSSRAuth'

const ManufacturerRegister: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const handleSubmit = useCallback(
    async (data: { name: string }) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const yupSchema = {
          name: Yup.string().required('Nome Obrigatório')
        }
        const schema = Yup.object().shape(yupSchema)

        await schema.validate(data, { abortEarly: false })

        const filds: Record<string, undefined> = {}
        Object.assign(filds, { name: data.name })
        await api.post('manufacturer', { name: data.name })
        formRef.current.reset()
        setLoading(false)
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Fabricante cadastrado com sucesso.'
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
            title: 'Houve um erro ao tentar cadastrar fabricante',
            description:
              'Sem conexão com o banco de dados, verifique seu acesso a internet e tente novamente.'
          })
          return
        }
        addToast({
          type: 'error',
          title: 'Ops!',
          description: 'Houve um erro ao cadastrar fabricante, tente novamente.'
        })
      }
    },
    [signOut]
  )
  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Header profileIcon menuIcon onClickMenu={handleMenu}></Header>
      <MenuDrawer
        visible={menuVisible}
        listMenus={permissions ? listMenusManagerAdm(permissions) : []}
      />
      <Content>
        <TitleRegisters>Cadastro de Fabricante</TitleRegisters>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Dados do Fabricante</span>
              </legend>
            </ConainerTitle>
            <Input label="Nome" name="name" required />
          </fieldset>
          <div className="containerButton">
            <Button secundary title="Salvar" type="submit" loading={loading} />
          </div>
        </Form>
      </Content>
    </Container>
  )
}

export default ManufacturerRegister
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
