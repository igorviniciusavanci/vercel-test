import React, { useCallback, useRef, useState } from 'react'
import Head from 'next/head'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import SelectData from '../DTO/selectDTO'
import { useToast } from '../hooks/toast'
import { listMenusManagerAdm } from '../utils/menusOptions'
import { cpfMask, phoneMask, removeMask } from '../utils/Mask'
import { api } from '../server/apiClient'
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
import User from '../DTO/userDTO'
import MenuDrawer from '../components/MenuDrawer'
import { useAuth } from '../hooks/auth'

interface UserFormData {
  name: string
  cpf: string
  rg: string
  email: string
  birthday: Date
  phone: string

  address: string
  postalCode: string
  number: string
  neighborhood: string
  city: SelectData
  state: SelectData
  iptu: string
}
interface UserDataProps {
  userData: User
}
const UserData: React.FC<UserDataProps> = ({ userData }) => {
  const { cpf, phone } = userData
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(true)

  const [cpfUser, setCpfUser] = useState(cpf ? cpfMask(cpf) : '')
  const [phoneUser, setPhoneUser] = useState(phone ? phoneMask(phone) : '')

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])
  const onChangeCpf = useCallback(event => {
    setCpfUser(cpfMask(event.target.value))
  }, [])

  const onChangePhone = useCallback(event => {
    setPhoneUser(phoneMask(event.target.value))
  }, [])
  const handleEditMode = useCallback(status => {
    setEdit(oldValue => !oldValue)
    if (!status) {
      setCpfUser(cpf ? cpfMask(cpf) : '')
      setPhoneUser(phone ? phoneMask(phone) : '')
      formRef.current.setData({
        name: userData.name,
        birthday: userData.birthday ? userData.birthday.substring(0, 10) : null,
        email: userData.email
      })
      return false
    } else {
      return true
    }
  }, [])

  const isEmpty = (obj: User): boolean => {
    return Object.keys(obj).length === 0
  }

  const handleSubmit = useCallback(async (data: UserFormData) => {
    try {
      setLoading(true)
      formRef.current?.setErrors({})
      const yupSchema = {
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().email('E-mail inválido')
      }
      const schema = Yup.object().shape(yupSchema)
      await schema.validate(data, { abortEarly: false })

      const filds: User = {} as User
      if (data.name !== userData.name) {
        Object.assign(filds, { name: data.name })
      }
      if (data.email !== userData.email) {
        Object.assign(filds, { email: data.email })
      }
      if (
        data.birthday.toString() !== '' &&
        data.birthday.toString() !==
          (userData.birthday && userData.birthday.substring(0, 10))
      ) {
        Object.assign(filds, { birthday: data.birthday })
      }
      if (removeMask(data.phone) !== userData.phone) {
        Object.assign(filds, { phone: removeMask(data.phone) })
      }

      if (!isEmpty(filds)) {
        console.log('entrou no if')
        Object.assign(filds, { id: userData.id })
        console.log(filds)
        await api.put('user', filds)
      }
      setLoading(false)
      setEdit(true)
      addToast({
        type: 'success',
        title: 'Alterado com sucesso'
      })
    } catch (error) {
      console.log(error.response)
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
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === 'Data de nascimento invalida'
      ) {
        addToast({
          type: 'error',
          title: 'Data de Nascimento não permitida',
          description:
            'Não foi possível atualizar o cadastro, o usuário precisar ter mais de 16 anos.'
        })
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
  }, [])

  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Header profileIcon menuIcon onClickMenu={handleMenu} back></Header>
      <MenuDrawer
        visible={menuVisible}
        listMenus={permissions ? listMenusManagerAdm(permissions) : []}
      />
      <Content>
        <TitleRegisters>Usuário Cadastrado</TitleRegisters>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: userData.name,
            birthday: userData.birthday
              ? userData.birthday.substring(0, 10)
              : null,
            email: userData.email
          }}
        >
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Dados Pessoais</span>
              </legend>
              {permissions && permissions.p_user & 4 && (
                <Button
                  title={edit ? 'Editar' : 'Cancelar'}
                  type="button"
                  onClick={() => handleEditMode(edit)}
                ></Button>
              )}
            </ConainerTitle>

            <Input label="Nome Completo" name="name" required disabled={edit} />
            <div className="formTriple">
              <Input
                label="CPF"
                name="cpf"
                required
                value={cpfUser}
                onChange={onChangeCpf}
                disabled
              />
              <Input
                label="Data de Nascimento"
                type="date"
                name="birthday"
                disabled={edit}
              />
              <Input
                label="Telefone"
                name="phone"
                value={phoneUser}
                onChange={onChangePhone}
                disabled={edit}
              />
            </div>
            <div className="formDubleLeft">
              <Input label="Email" name="email" disabled={edit} />
            </div>
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

export default UserData
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('user', {
    params: ctx.query
  })
  const userData = response.data[0]
  return {
    props: { userData }
  }
})
