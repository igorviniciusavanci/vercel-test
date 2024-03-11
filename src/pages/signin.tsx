import React, { useCallback, useRef, useState } from 'react'
import Router from 'next/router'
import * as Yup from 'yup'
import Head from 'next/head'
import Image from 'next/image'
import logo from '../assets/images/agrologoLight.png'
import backgroundImage from '../assets/images/bg.jpg'
import { useAuth } from '../hooks/auth'
import { FormHandles } from '@unform/core'

import {
  Container,
  Content,
  CotainerImage,
  ContentForm,
  Box,
  BoxHeader,
  Title,
  BoxForm
} from '../styles/pages/Signin'
import Input from '../components/Input'
import Button from '../components/Button'
import { withSSRGuest } from '../hocs/withSSRGuest'
import { cpfMask, removeMask } from '../utils/Mask'
import getValidationsErrors from '../utils/getValidationErrors'
import { useToast } from '../hooks/toast'
import ToggleButton from '../components/ToggleButton'
import { usePreferences } from '../hooks/preferences'

interface SiginInFormData {
  cpf: string
  password: string
}

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { setPreferences, theme } = usePreferences()
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleTheme = () => {
    theme === 'light'
      ? setPreferences({ theme: 'dark' })
      : setPreferences({ theme: 'light' })
  }

  const handleSubmit = useCallback(
    async (data: SiginInFormData) => {
      try {
        formRef.current?.setErrors({})
        setLoading(true)
        const schema = Yup.object().shape({
          cpf: Yup.string().required('CPF obrigatório'),
          password: Yup.string().required('Senha obrigatória')
        })
        await schema.validate(data, { abortEarly: false })

        await signIn({
          cpf: removeMask(data.cpf),
          password: data.password
        })
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        if (err.response && err.response.status === 401) {
          addToast({
            type: 'error',
            title: 'Houve um erro ao fazer login',
            description:
              'CPF ou senha incorretos, verifique os dados informados e tente novamente'
          })
          return
        }
        if (err === 'Network Error') {
          addToast({
            type: 'error',
            title: 'Houve um erro ao fazer login',
            description:
              'Sem conexão com o banco de dados, verifique seu acesso a internet e tente novamente'
          })
          return
        }
        addToast({
          type: 'error',
          title: 'Houve um erro ao fazer login',
          description: 'Entre em contato com o suporte e reporte esse problema.'
        })
      }
    },
    [signIn]
  )

  const onChangeCpf = useCallback(event => {
    setCpf(cpfMask(event.target.value))
  }, [])

  const onNavigate = useCallback(() => {
    Router.push('/password-forgot')
  }, [])

  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Content>
        <CotainerImage>
          <div className="background">
            <div className="layer"></div>
            <Image src={backgroundImage} objectFit="cover" priority />
          </div>
        </CotainerImage>
        <ContentForm>
          <Box>
            <BoxForm ref={formRef} onSubmit={handleSubmit}>
              <BoxHeader>
                <Image src={logo} width="150" height="95" />
              </BoxHeader>
              <Title>Faça login no AgroApp</Title>
              <Input
                label="CPF"
                name="cpf"
                required
                value={cpf}
                onChange={onChangeCpf}
              />
              <Input label="Senha" name="password" type="password" required />
              <div className="containerButton">
                <Button title="Entrar" type="submit" loading={loading} />
                <div className="forgotPassword">
                  <button type="button" onClick={onNavigate}>
                    Esqueci minha senha
                  </button>
                </div>
              </div>
            </BoxForm>
          </Box>
        </ContentForm>
        <div className="theme">
          <ToggleButton onChange={toggleTheme} />
        </div>
      </Content>
    </Container>
  )
}

type userData = { user: { cpf: string } }

export default Signin
export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  }
})
