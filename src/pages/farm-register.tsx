import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { cnpj as CNPJValidator, cpf as CPFValidator } from 'cpf-cnpj-validator'
import { IoClose } from 'react-icons/io5'
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
import { listMenusManagerAdm } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import getValidationsErrors from '../utils/getValidationErrors'
import { cnpjMask, cpfMask, phoneMask, removeMask } from '../utils/Mask'
import { useToast } from '../hooks/toast'
import { api } from '../server/apiClient'
import { useAuth } from '../hooks/auth'
import InputFile from '../components/InputFile'
import { withSSRAuth } from '../hocs/withSSRAuth'

interface RegisterFarmData {
  name: string
  cnpj: string
  cpf: string
  razao_social: string
  phone: string
}

const FarmRegister: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { permissions, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [cnpj, setCnpj] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const [fileImage, setFileImage] = useState<File>()
  const [filePreview, setFilePreview] = useState<string>()

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const onchangeCnpj = useCallback(event => {
    setCnpj(cnpjMask(event.target.value))
  }, [])

  const onchangeCpf = useCallback(event => {
    setCpf(cpfMask(event.target.value))
  }, [])

  const onChangePhone = useCallback(event => {
    setPhone(phoneMask(event.target.value))
  }, [])

  const createFile = useCallback(async id => {
    try {
      const fildData = new FormData()
      fildData.append('farm_id', id)
      fildData.append('file', fileImage)

      await api.post('files', fildData)
    } catch (error) {
      console.log(error)
      console.log('error file')
    }
  }, [])

  const handleSubmit = useCallback(
    async (data: RegisterFarmData) => {
      try {
        console.log(data)
        setLoading(true)
        formRef.current?.setErrors({})

        const cnpjValid = CNPJValidator.isValid(removeMask(data.cnpj))
        const cpfValid = CPFValidator.isValid(removeMask(data.cpf))

        const yupSchema = {
          name: Yup.string().required('Nome obrigatório'),
          razao_social: Yup.string().required('Razão Social obrigatória'),
          phone: Yup.string().required('Telefone obrigatório')
        }
        const schema = Yup.object().shape(yupSchema)

        if (!data.cnpj && !data.cpf) {
          addToast({
            type: 'info',
            title: 'CPF ou CPNJ obrigatório',
            description:
              'Para cadastrar uma fazenda é necessário informar um CPF ou CNPJ'
          })
          setLoading(false)
          return
        }

        await schema.validate(data, { abortEarly: false })

        if (!cnpjValid && data.cnpj) {
          formRef.current?.setErrors({
            cnpj: 'CNPJ inválido'
          })
          setLoading(false)
          return
        }
        if (!cpfValid && data.cpf) {
          formRef.current?.setErrors({
            cpf: 'CPF inválido'
          })
          setLoading(false)
          return
        }
        const filds: Record<string, undefined> = {}
        Object.assign(filds, { razao_social: data.razao_social })
        Object.assign(filds, { name: data.name })
        if (data.cnpj) {
          Object.assign(filds, { cnpj: removeMask(data.cnpj) })
        }
        if (data.cpf) {
          Object.assign(filds, { cpf: removeMask(data.cpf) })
        }
        Object.assign(filds, { phone: removeMask(data.phone) })
        const response = await api.post('farm', filds)
        await createFile(response.data.id)

        formRef.current.reset()
        setPhone('')
        setCnpj('')
        setCpf('')
        setFileImage(null)
        setLoading(false)
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Fazenda cadastrada com sucesso.'
        })
      } catch (error) {
        setLoading(false)
        console.log(error)
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
        if (error === 'Network Error') {
          addToast({
            type: 'error',
            title: 'Houve um erro ao tentar cadastrar fazenda',
            description:
              'Sem conexão com o banco de dados, verifique seu acesso a internet e tente novamente'
          })
          return
        }
        addToast({
          type: 'error',
          title: 'Ops!',
          description:
            'Houve um erro ao cadastrar fazenda, verifique os dados informados e tente novamente'
        })
      }
    },
    [signOut, fileImage]
  )

  useEffect(() => {
    if (fileImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(fileImage)
    } else {
      setFilePreview('')
    }
  }, [fileImage])

  const onChangeImage = useCallback(event => {
    if (event.target.files) {
      console.log(event.target.files[0])
      const file: File = event.target.files[0]
      if (file && file.type.substring(0, 5) === 'image') {
        console.log('entrou no if')
        setFileImage(file)
      } else {
        setFileImage(null)
      }
    }
    setLoadingImage(false)
  }, [])

  const handleRemoveImage = useCallback(() => {
    setFileImage(null)
    setLoadingImage(false)
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
        <TitleRegisters>Cadastro da Fazenda</TitleRegisters>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Dados da Fazenda</span>
              </legend>
            </ConainerTitle>
            <Input label="Nome da Fazenda" name="name" required />
            <Input label="Razão Social" name="razao_social" required />

            <div className="formTriple">
              <Input
                label="Telefone"
                name="phone"
                required
                value={phone}
                onChange={onChangePhone}
              />
              <Input
                label="CPF"
                name="cpf"
                value={cpf}
                onChange={onchangeCpf}
              />
              <Input
                label="CNPJ"
                name="cnpj"
                value={cnpj}
                onChange={onchangeCnpj}
              />
            </div>
            <div className="containerImage">
              {filePreview ? (
                <div className="formDubleRight">
                  <div className="patrimonyImage">
                    <img src={filePreview} />
                    <button onClick={handleRemoveImage} type="button">
                      <IoClose size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <InputFile
                  // loadingImage={loadingImage}
                  onChangeFile={onChangeImage}
                  onClick={() => setLoadingImage(true)}
                />
              )}
            </div>
          </fieldset>
          <div className="containerButton">
            <Button secundary title="Salvar" type="submit" loading={loading} />
          </div>
        </Form>
      </Content>
    </Container>
  )
}

export default FarmRegister
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
