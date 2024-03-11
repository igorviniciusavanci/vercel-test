import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { api } from '../server/apiClient'
import {
  Container,
  Content,
  ConainerTitle
} from '../styles/pages/RegisterPages'
import * as Yup from 'yup'
import { cpf as CPFValidator } from 'cpf-cnpj-validator'
import Input from '../components/Input'
import Button from '../components/Button'
import Header from '../components/Header'
import { listMenusManagerAdm } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import { cpfMask, phoneMask, removeMask } from '../utils/Mask'
import SelectData from '../DTO/selectDTO'
import getValidationsErrors from '../utils/getValidationErrors'
import { useToast } from '../hooks/toast'
import { useAuth } from '../hooks/auth'
import { withSSRAuth } from '../hocs/withSSRAuth'

interface RegisterUserData {
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
const UserRegister: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const onChangeCpf = useCallback(event => {
    setCpf(cpfMask(event.target.value))
  }, [])

  const onChangePhone = useCallback(event => {
    setPhone(phoneMask(event.target.value))
  }, [])
  const handleSubmit = useCallback(async (data: RegisterUserData) => {
    try {
      setLoading(true)
      formRef.current?.setErrors({})

      const cpfValid = CPFValidator.isValid(removeMask(data.cpf))

      const yupSchema = {
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail obrigatório'),
        cpf: Yup.string().required('CPF obrigatório')
      }
      const schema = Yup.object().shape(yupSchema)
      await schema.validate(data, { abortEarly: false })

      if (!cpfValid && data.cpf) {
        formRef.current?.setErrors({
          cpf: 'CPF inválido'
        })
        setLoading(false)
        return
      }
      const filds: Record<string, undefined> = {}
      Object.assign(filds, { name: data.name })
      Object.assign(filds, { cpf: removeMask(data.cpf) })
      if (data.email) Object.assign(filds, { email: data.email })

      if (data.phone) {
        Object.assign(filds, { phone: removeMask(data.phone) })
      }

      if (data.birthday) {
        Object.assign(filds, { birthday: data.birthday })
        // Object.assign(filds, { birthday: data.birthday.substring(0, 10) })
      }
      Object.assign(filds, { password: '123456' })
      console.log(filds)
      await api.post('user', filds)
      formRef.current.reset()
      setPhone('')
      setCpf('')
      setLoading(false)
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Usuário cadastrado com sucesso.'
      })
    } catch (error) {
      console.log(error.response)
      setLoading(false)
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
        error.response.data.message === 'CPF já cadastrado'
      ) {
        addToast({
          type: 'error',
          title: 'CPF já cadastrado',
          description:
            'Não foi possível efetuar o cadastro, o CPF informado já foi cadastrado no sistema'
        })
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
            'Não foi possível efetuar o cadastro, o usuário precisar ter mais de 16 anos para ser cadastrado.'
        })
        return
      }
      if (error === 'Network Error') {
        addToast({
          type: 'error',
          title: 'Houve um erro ao tentar cadastrar usuário',
          description:
            'Sem conexão com o banco de dados, verifique seu acesso a internet e tente novamente'
        })
        return
      }
      addToast({
        type: 'error',
        title: 'Ops!',
        description:
          'Houve um erro ao cadastrar usuário, verifique os dados informados e tente novamente'
      })
    }
  }, [])
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
        <TitleRegisters>Cadastro de Usuários</TitleRegisters>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Dados Pessoais</span>
              </legend>
            </ConainerTitle>
            <Input label="Nome Completo" name="name" required />
            <div className="containermetaDubleLeft"></div>
            <div className="formTriple">
              <Input
                label="CPF"
                name="cpf"
                required
                value={cpf}
                onChange={onChangeCpf}
              />
              <Input label="Data de Nascimento" type="date" name="birthday" />
              <Input
                label="Telefone"
                name="phone"
                value={phone}
                onChange={onChangePhone}
              />
            </div>
            <div className="formDubleLeft">
              <Input label="Email" name="email" required />
            </div>
          </fieldset>

          {/* <fieldset className="address"> */}
          {/* <fieldset>
            <legend>Endereço</legend>
            <div className="containermetaDubleLeft">
              <Input label="Logradouro" name="address" required />
              <Input label="Número" name="number" required />
            </div>
            <div className="containermetaDubleLeft">
              <Input label="Complemento" name="complement" />
              <Input
                label="Cep"
                name="postalCode"
                required
                value={cep}
                onChange={onChangeCep}
              />
            </div>
            <Input label="Bairro" name="neighborhood" required />
            <div className="formTriple">
              <Select
                label="Estado"
                name="state"
                required
                // disabled={editAddress}
                options={options}
                // onChange={(e: object) => onchangeState(e)}
              />
              <Select
                label="Cidade"
                name="city"
                required
                // disabled={editAddress}
                options={listCity}
              />
            </div>
          </fieldset> */}
          <div className="containerButton">
            <Button secundary title="Salvar" type="submit" loading={loading} />
          </div>
        </Form>
      </Content>
    </Container>
  )
}

export default UserRegister
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
