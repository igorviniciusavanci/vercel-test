import React, { useCallback, useRef, useState } from 'react'
import Head from 'next/head'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useToast } from '../hooks/toast'
import { listMenusManagerAdm } from '../utils/menusOptions'
import getValidationsErrors from '../utils/getValidationErrors'
import {
  Container,
  Content,
  ConainerTitle
} from '../styles/pages/ShowDataPages'
import Header from '../components/Header'
import Button from '../components/Button'
import TitleRegisters from '../components/TitleRegisters'
import Input from '../components/Input'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import MenuDrawer from '../components/MenuDrawer'
import PatrimonyGroupData from '../DTO/patrimonyGroupDTO'
import { api } from '../server/apiClient'
import { useAuth } from '../hooks/auth'

interface PatrimonyGroupFormData {
  id: string
  name: string
}
interface PatrimonyGroupDataProps {
  patrimonyGroupData: PatrimonyGroupData
}
const PatrominyGroup: React.FC<PatrimonyGroupDataProps> = ({
  patrimonyGroupData
}) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(true)

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const handleEditMode = useCallback(status => {
    setEdit(oldValue => !oldValue)
    if (!status) {
      formRef.current.setData({
        name: patrimonyGroupData.name
      })
      return false
    } else {
      return true
    }
  }, [])

  const isEmpty = (obj: PatrimonyGroupData): boolean => {
    return Object.keys(obj).length === 0
  }

  const handleSubmit = useCallback(
    async (data: PatrimonyGroupFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const yupSchema = {
          name: Yup.string().required('Descrição obrigatória')
        }
        const schema = Yup.object().shape(yupSchema)
        await schema.validate(data, { abortEarly: false })

        const filds: PatrimonyGroupData = {} as PatrimonyGroupData
        if (data.name !== patrimonyGroupData.name) {
          Object.assign(filds, { name: data.name })
        }

        if (!isEmpty(filds)) {
          Object.assign(filds, { id: patrimonyGroupData.id })
          console.log(filds)
          await api.put('patrimonygroup', filds)
        }
        setLoading(false)
        setEdit(true)
        addToast({
          type: 'success',
          title: 'Alterado com sucesso'
        })
      } catch (error) {
        console.log(error)
        setLoading(false)
        if (error instanceof Yup.ValidationError) {
          console.log(error)
          const errors = getValidationsErrors(error)
          formRef.current?.setErrors(errors)
        }
        if (error.response && error.response.status === 401) {
          signOut()
          return
        }
        if (error === 'Network Error') {
          addToast({
            type: 'error',
            title: 'Houve um erro ao tentar salvar dados',
            description:
              'Sem conexão com o banco de dados, verifique seu acesso a internet e tente novamente'
          })
          return
        }
        addToast({
          type: 'error',
          title: 'Ops!',
          description:
            'Houve um erro ao salvar os dados, verifique os dados informados e tente novamente'
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
        <TitleRegisters>Grupo de Patrimônio Cadastrado</TitleRegisters>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: patrimonyGroupData.name
          }}
        >
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Dados do Grupo de Patrimônio</span>
              </legend>
              {permissions && permissions.p_user & 4 && (
                <Button
                  title={edit ? 'Editar' : 'Cancelar'}
                  type="button"
                  onClick={() => handleEditMode(edit)}
                ></Button>
              )}
            </ConainerTitle>
            <Input label="Descrição" name="name" required disabled={edit} />
          </fieldset>
          {!edit && (
            <div className="containerButton">
              <Button
                secundary
                title="Salvar"
                type="submit"
                loading={loading}
              />
            </div>
          )}
        </Form>
      </Content>
    </Container>
  )
}

export default PatrominyGroup
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('patrimonygroup', {
    params: ctx.query
  })
  const patrimonyGroupData = response.data[0]
  return {
    props: { patrimonyGroupData }
  }
})
