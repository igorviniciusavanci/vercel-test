import React, { useCallback, useRef, useState } from 'react'
import Head from 'next/head'
import { cnpj as CNPJValidator, cpf as CPFValidator } from 'cpf-cnpj-validator'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { IoClose } from 'react-icons/io5'
import * as Yup from 'yup'
import { useToast } from '../hooks/toast'
import { listMenusManagerAdm } from '../utils/menusOptions'
import { cnpjMask, cpfMask, phoneMask, removeMask } from '../utils/Mask'
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
import FarmData from '../DTO/farmDTO'
import { api } from '../server/apiClient'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/auth'
import InputFile from '../components/InputFile'
import { usePreferences } from '../hooks/preferences'

interface FarmFormData {
  id: string
  name: string
  razao_social: string
  phone: string
  cnpj: string
  cpf: string
}
interface FarmDataProps {
  farmData: FarmData
}
const Farm: React.FC<FarmDataProps> = ({ farmData }) => {
  const { cnpj, phone, cpf } = farmData
  const { theme } = usePreferences()
  const formRef = useRef<FormHandles>(null)
  const router = useRouter()
  const { permissions, signOut } = useAuth()
  const { addToast } = useToast()
  const [menuVisible, setMenuVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(true)
  const [cpFarm, setCpFarm] = useState(cpf ? cpfMask(cpf) : '')
  const [cnpjFarm, setCnpjFarm] = useState(cnpj ? cnpjMask(cnpj) : '')
  const [phoneFarm, setPhoneFarm] = useState(phone ? phoneMask(phone) : '')
  const [loadingImage, setLoadingImage] = useState(false)
  const [pathImage, setPathImage] = useState(
    farmData && farmData.file ? farmData.file.path : ''
  )

  const [idFileImage, setIdFileImage] = useState(
    farmData && farmData.file ? farmData.file.id : ''
  )
  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])
  const onChangeCnpj = useCallback(event => {
    setCnpjFarm(cnpjMask(event.target.value))
  }, [])

  const onchangeCpf = useCallback(event => {
    setCpFarm(cpfMask(event.target.value))
  }, [])

  const onChangePhone = useCallback(event => {
    setPhoneFarm(phoneMask(event.target.value))
  }, [])
  const handleEditMode = useCallback(status => {
    setEdit(oldValue => !oldValue)
    if (!status) {
      setCnpjFarm(cnpj ? cnpjMask(cnpj) : '')
      formRef.current.setData({
        name: farmData.name,
        razao_social: farmData.razao_social
      })
      return false
    } else {
      return true
    }
  }, [])

  const isEmpty = (obj: FarmData): boolean => {
    return Object.keys(obj).length === 0
  }

  const handleSubmit = useCallback(
    async (data: FarmFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const yupSchema = {
          name: Yup.string().required('Nome obrigatório')
        }
        const schema = Yup.object().shape(yupSchema)
        await schema.validate(data, { abortEarly: false })

        const cnpjValid = CNPJValidator.isValid(removeMask(data.cnpj))
        const cpfValid = CPFValidator.isValid(removeMask(data.cpf))

        const filds: FarmData = {} as FarmData
        if (data.name !== farmData.name) {
          Object.assign(filds, { name: data.name })
        }
        if (data.razao_social !== farmData.razao_social) {
          Object.assign(filds, { razao_social: data.razao_social })
        }
        if (removeMask(data.phone) !== farmData.phone) {
          Object.assign(filds, { phone: removeMask(data.phone) })
        }
        if (removeMask(data.cnpj) !== farmData.cnpj) {
          Object.assign(filds, {
            cnpj: data.cnpj ? removeMask(data.cnpj) : null
          })
        }
        if (removeMask(data.cpf) !== farmData.cpf) {
          Object.assign(filds, { cpf: data.cpf ? removeMask(data.cpf) : null })
        }

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

        if (!isEmpty(filds)) {
          Object.assign(filds, { id: farmData.id })
          console.log(filds)
          await api.put('farm', filds)
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

  const onChangeImage = useCallback(
    async event => {
      const file: File = event.target.files[0]
      if (file && file.type.substring(0, 5) === 'image') {
        try {
          const fildData = new FormData()
          fildData.append('farm_id', farmData.id)
          fildData.append('file', file)

          const result = await api.post('files', fildData)
          setPathImage(result.data.path)
          setIdFileImage(result.data.id)
          setEdit(true)
          addToast({
            type: 'success',
            title: 'Imagem inserida com sucesso'
          })
        } catch (error) {
          console.log({ erroImage: error.response })
        }
      }
      setLoadingImage(false)
    },
    [farmData]
  )

  const handleRemoveImage = useCallback(() => {
    try {
      api.delete(`files?id=${idFileImage}`)
      setPathImage('')
      setIdFileImage('')
      setEdit(true)
      addToast({
        type: 'success',
        title: 'Imagem removida com sucesso'
      })
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }, [idFileImage, addToast])

  return (
    <Container>
      <Head>
        {/* <meta
          name="theme-color"
          content={`${theme === 'light' ? '#fff' : '#203038'}`}
        /> */}
        <title>AgroApp</title>
      </Head>
      <Header profileIcon menuIcon onClickMenu={handleMenu} back></Header>
      <MenuDrawer
        visible={menuVisible}
        listMenus={permissions ? listMenusManagerAdm(permissions) : []}
      />
      <Content>
        <TitleRegisters>Fazenda Cadastrada</TitleRegisters>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: farmData.name,
            razao_social: farmData.razao_social
          }}
        >
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Dados da Fazenda</span>
              </legend>
              {permissions && permissions.p_user & 4 && (
                <Button
                  title={edit ? 'Editar' : 'Cancelar'}
                  type="button"
                  onClick={() => handleEditMode(edit)}
                ></Button>
              )}
            </ConainerTitle>

            <Input
              label="Nome da Fazenda"
              name="name"
              required
              disabled={edit}
            />
            <Input
              label="Razão Social"
              name="razao_social"
              required
              disabled={edit}
            />
            <div className="formTriple">
              <Input
                label="Telefone"
                name="phone"
                required
                value={phoneFarm}
                onChange={onChangePhone}
                disabled={edit}
              />
              <Input
                label="CPF"
                name="cpf"
                value={cpFarm}
                onChange={onchangeCpf}
              />
              <Input
                label="CNPJ"
                name="cnpj"
                value={cnpjFarm}
                onChange={onChangeCnpj}
                disabled={edit}
              />
            </div>
            {pathImage ? (
              <div className="formDubleRight">
                <div className="patrimonyImage">
                  <a
                    href={`https://agroappfiles.s3.amazonaws.com/${pathImage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`https://agroappfiles.s3.amazonaws.com/${pathImage}`}
                    />
                  </a>
                  {!edit && (
                    <button onClick={handleRemoveImage} type="button">
                      <IoClose size={16} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                {!edit && (
                  <InputFile
                    loadingImage={loadingImage}
                    onChangeFile={onChangeImage}
                    onClick={() => setLoadingImage(true)}
                  />
                )}
              </>
            )}
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

export default Farm
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('farm', {
    params: ctx.query
  })
  console.log(response.data[0])
  const farmData = response.data[0]
  return {
    props: { farmData }
  }
})
