import React, { useCallback, useRef, useState } from 'react'
import Router from 'next/router'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import {
  Container,
  Content,
  Title,
  Subtitle
} from '../styles/pages/PasswordEdit'
import { cpf as CPFValidator } from 'cpf-cnpj-validator'
import { useAuth } from '../hooks/auth'
import { useToast } from '../hooks/toast'
import getValidationsErrors from '../utils/getValidationErrors'
import Header from '../components/Header'
import Input from '../components/Input'

import Button from '../components/Button'
import { api } from '../server/apiClient'
import { cpfMask, removeMask } from '../utils/Mask'
import { withSSRGuest } from '../hocs/withSSRGuest'
interface PasswordForgotFormData {
  cpf: string
}

const PasswordForgot: React.FC = () => {
  const { updatePassword, user } = useAuth()
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)

  const [loading, setLoading] = useState(false)
  const [cpf, setCpf] = useState('')

  const hadleSubmit = useCallback(
    async (data: PasswordForgotFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const cpfValid = CPFValidator.isValid(removeMask(data.cpf))
        const schema = Yup.object().shape({
          cpf: Yup.string().required('CPF obrigatório')
        })
        await schema.validate(data, { abortEarly: false })
        if (!cpfValid && data.cpf) {
          formRef.current?.setErrors({
            cpf: 'CPF inválido'
          })
          setLoading(false)
          return
        }

        await api.post('pass/forgot', {
          cpf: removeMask(data.cpf)
        })

        setLoading(false)
        addToast({
          type: 'success',
          title: 'Email enviado com sucesso',
          description:
            'Acesse seu email de cadastro e siga as orientações para recuperar sua senha'
        })
        Router.push('signin')
      } catch (err) {
        console.log(err)
        setLoading(false)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: 'Ops!',
          description: 'Houve um erro ao tentar enviar o email, tente novamente'
        })
      }
    },
    [addToast, updatePassword, user]
  )

  const onChangeCpf = useCallback(event => {
    setCpf(cpfMask(event.target.value))
  }, [])

  return (
    <Container>
      <Header back />
      <Content>
        <Title>Recuperar senha</Title>
        <Subtitle>
          {
            'Informe seu CPF no campo abaixo  e clique no botão "Enviar", em seguida você receberá um e-mail com o passo a passo para efetuar a alteração da senha.'
          }
        </Subtitle>
        <Form ref={formRef} onSubmit={hadleSubmit}>
          <Input
            label="CPF"
            name="cpf"
            required
            value={cpf}
            onChange={onChangeCpf}
          />

          <div className="containerButton">
            <Button title="Enviar" loading={loading}></Button>
          </div>
        </Form>
      </Content>
    </Container>
  )
}

export default PasswordForgot
export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  }
})
