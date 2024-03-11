import React, { useCallback, useRef, useState } from 'react'

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

import backgroundImage from '../assets/images/bg.jpg'
import Button from '../components/Button'
import { withSSRAuth } from '../hocs/withSSRAuth'
// import recoverImage from '../../assets/images/forgotPassword.jpg'
// import getValidationsErrors from '../../utils/getValidationErrors'
// import { useToast } from '../../hooks/toast'
// import { useAuth } from '../../hooks/auth'

interface PasswordEditFormData {
  password: string
  oldPassword: string
  repeatPassword: string
}

const PasswordEdit: React.FC = () => {
  const { updatePassword, user } = useAuth()
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)

  const [loading, setLoading] = useState(false)

  const hadleSubmit = useCallback(
    async (data: PasswordEditFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          oldPassword: Yup.string().required('Senha atual obrigatória'),
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
        await updatePassword({
          id: user.id,
          password: data.password,
          oldPassword: data.oldPassword
        })
        setLoading(false)
        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso'
        })
        history.back()
      } catch (err) {
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
      <Header back profileIcon />
      <Content>
        <Title>Alterar senha</Title>
        <Form ref={formRef} onSubmit={hadleSubmit}>
          <Input
            name="oldPassword"
            required
            type="password"
            label="Senha atual"
          />
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

export default PasswordEdit
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
