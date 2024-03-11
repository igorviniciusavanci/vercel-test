import React, { useCallback, useRef, useState } from 'react'
import { withSSRGuest } from '../hocs/withSSRGuest'
import { setupAPIClient } from '../server/api'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import {
  Container,
  Content,
  Title,
  ConteinerImage,
  ImageBackground
} from '../styles/pages/PasswordEdit'
import { useAuth } from '../hooks/auth'
import { useToast } from '../hooks/toast'
import getValidationsErrors from '../utils/getValidationErrors'
import Header from '../components/Header'
import Input from '../components/Input'

import Button from '../components/Button'
import { api } from '../server/apiClient'
import Router from 'next/router'
interface PasswordRecoverFormData {
  password: string
  oldPassword: string
  repeatPassword: string
}

interface PasswordRecoverProps {
  token: string
}

const PasswordRecover: React.FC<PasswordRecoverProps> = ({ token }) => {
  const { updatePassword, user } = useAuth()
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)

  const [loading, setLoading] = useState(false)

  const hadleSubmit = useCallback(
    async (data: PasswordRecoverFormData) => {
      try {
        setLoading(true)
        // const token = location.search.substring(location.search.indexOf('=') + 1)
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Nova senha obrigatória')
            .min(6, 'A senha deve conter no mínimo 6 dígitos'),
          repeatPassword: Yup.string()
            .required('Confirmação de senha obrigatória')
            .oneOf(
              [Yup.ref('password'), null],
              'Confirmação de senha incorreta'
            )
        })
        await schema.validate(data, { abortEarly: false })
        await api.post('pass/reset', {
          password: data.password,
          token
        })
        setLoading(false)
        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
          description:
            'Faça login no sistema AgroApp utilizando a nova senha cadastrada.'
        })
        Router.push('signin')
      } catch (err) {
        console.log(err.response)
        setLoading(false)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: 'Ops!',
          description: 'Houve um erro ao tentar alterar senha, tente novamente'
        })
      }
    },
    [addToast, updatePassword, user]
  )
  return (
    <Container>
      <Header />
      <Content>
        <Title>Cadastrar nova senha</Title>
        <Form ref={formRef} onSubmit={hadleSubmit}>
          <Input name="password" required type="password" label="Nova senha" />
          <Input
            name="repeatPassword"
            type="password"
            required
            label="Confirmar nova senha"
          />
          <div className="containerButton">
            <Button title="Salvar" loading={loading}></Button>
          </div>
        </Form>
        {/* <ConteinerImage>
          <ImageBackground src={backgroundImage} />
        </ConteinerImage> */}
      </Content>
    </Container>
  )
}

export default PasswordRecover
export const getServerSideProps = withSSRGuest(async ctx => {
  console.log(ctx.query)

  return {
    props: ctx.query
  }
})
