import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import Select from '../components/Select'
import { IoClose } from 'react-icons/io5'
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
import { useToast } from '../hooks/toast'
import { api } from '../server/apiClient'
import getValidationsErrors from '../utils/getValidationErrors'
import FarmData from '../DTO/farmDTO'
import SelectData from '../DTO/selectDTO'
import PatrimonyGroupData from '../DTO/patrimonyGroupDTO'
import Money from '../utils/MaskMoney'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import ManufacturerData from '../DTO/manufacturerDTO'
import { useAuth } from '../hooks/auth'
import { fuelOptions } from '../utils/listOptions'
import InputFile from '../components/InputFile'

interface PreviewProps {
  data: string
  file: File
}

interface FormData {
  name: string
  description: string
  farm: SelectData
  patrimony_group: SelectData
  patrimony_code: string
  manufacturer: SelectData
  model: string
  color: string
  motor_number: string
  serial_number: string
  chassi_number: string
  fuel: string
  p_max: string
  p_min: string
  acquisition_date: string
  manufacturing_date: string
  nfe_number: string
  value: string
  note: string
}

interface PatrimonyRegisterProps {
  listGP: SelectData[]
  listFarms: SelectData[]
  listManufacturers: SelectData[]
}
const PatrimonyRegister: React.FC<PatrimonyRegisterProps> = ({
  listGP,
  listFarms,
  listManufacturers
}) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  const [fileImage, setFileImage] = useState<File>()
  const [fileList, setFileList] = useState<File[]>([])
  const [filePreview, setFilePreview] = useState<string>()
  const [fileListPreview, setFileListPreview] = useState<string[]>([])
  const [fileListPreviewId, setFileListPreviewId] = useState<PreviewProps[]>([])
  const [farms, setFarms] = useState<SelectData[]>(listFarms || [])
  const [manufacturers, setManufacturers] = useState<SelectData[]>(
    listManufacturers || []
  )
  const [patrimonyGroups, setPatrimonyGroups] = useState<SelectData[]>(
    listGP || []
  )
  const [value, setValue] = useState('')
  const [selectedFarm, setSelectedFarm] = useState<SelectData>()
  const [selectedPatrimonyGroup, setSelectedPatrimonyGroup] =
    useState<SelectData>()
  const [selectedManufacturer, setSelectedManufacturer] = useState<SelectData>()
  const [fuel, setFuel] = useState<SelectData>()
  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

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

  useEffect(() => {
    async function getAllFarms(): Promise<void> {
      let response = null
      try {
        response = await api.get('/farm')
        const listFarms = response.data.map((farm: FarmData) => {
          return { value: farm.id, label: farm.name }
        })
        setFarms(listFarms)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          signOut()
        }
      }
    }
    getAllFarms()
  }, [])

  useEffect(() => {
    async function getAllPatrimonyGroups(): Promise<void> {
      let response = null
      try {
        response = await api.get('/patrimonygroup')
        const listPatrimonyGroups = response.data.map(
          (Patrimony: PatrimonyGroupData) => {
            return { value: Patrimony.id, label: Patrimony.name }
          }
        )
        setPatrimonyGroups(listPatrimonyGroups)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          signOut()
        }
      }
    }
    getAllPatrimonyGroups()
  }, [])

  useEffect(() => {
    async function getAllManufacturer(): Promise<void> {
      let response = null
      try {
        response = await api.get('/manufacturer')
        const listManufacturers = response.data.map(
          (manufacturer: ManufacturerData) => {
            return { value: manufacturer.id, label: manufacturer.name }
          }
        )
        setManufacturers(listManufacturers)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          signOut()
        }
      }
    }
    getAllManufacturer()
  }, [])
  const handleSubmit = useCallback(
    async (data: FormData) => {
      console.log({ data })
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const yupSchema = {
          name: Yup.string().required('Nome Obrigatório')
        }
        const schema = Yup.object().shape(yupSchema)

        await schema.validate(data, { abortEarly: false })

        const filds: Record<string, null> = {}
        Object.assign(filds, { name: data.name })

        if (data.description) {
          Object.assign(filds, { description: data.description })
        }
        if (selectedFarm && selectedFarm.value) {
          Object.assign(filds, { farm_id: selectedFarm.value })
        }
        if (selectedPatrimonyGroup && selectedPatrimonyGroup.value) {
          Object.assign(filds, {
            patrimony_group_id: selectedPatrimonyGroup.value
          })
        }
        if (data.patrimony_code) {
          Object.assign(filds, { patrimony_code: data.patrimony_code })
        }
        if (selectedManufacturer && selectedManufacturer.value) {
          Object.assign(filds, { manufacturer_id: selectedManufacturer.value })
        }
        if (data.model) {
          Object.assign(filds, { model: data.model })
        }
        if (data.color) {
          Object.assign(filds, { color: data.color })
        }
        if (data.motor_number) {
          Object.assign(filds, { motor_number: data.motor_number })
        }
        if (data.serial_number) {
          Object.assign(filds, { serial_number: data.serial_number })
        }
        if (data.chassi_number) {
          Object.assign(filds, { chassi_number: data.chassi_number })
        }
        if (fuel && fuel.value) {
          Object.assign(filds, { fuel: fuel.value })
        }

        if (data.p_max) {
          Object.assign(filds, { maximum_power: data.p_max })
        }
        if (data.p_min) {
          Object.assign(filds, { minimum_power: data.p_min })
        }
        if (data.acquisition_date) {
          Object.assign(filds, { acquisition_date: data.acquisition_date })
        }
        if (data.manufacturing_date) {
          Object.assign(filds, { manufacturing_date: data.manufacturing_date })
        }
        if (data.nfe_number) {
          Object.assign(filds, { nfe_number: data.nfe_number })
        }
        if (data.value) {
          Object.assign(filds, { value: Money.strip(data.value) })
        }
        if (data.note) {
          Object.assign(filds, { note: data.note })
        }
        console.log(filds)

        const result = await api.post('patrimonyitem', filds)

        console.log(result.data)
        if (result.data && fileList && fileList.length > 0) {
          try {
            for (let index = 0; index < fileList.length; index++) {
              const fildData = new FormData()
              fildData.append('patrimony_item_id', result.data.id)
              fildData.append('files', fileList[index])

              await api.post('files', fildData)
            }
          } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 401) {
              signOut()
            }
          }
        }

        formRef.current.reset()
        setValue('')
        setLoading(false)
        setFileImage(null)
        setFileList([])
        setFileListPreview([])
        setFileListPreviewId([])
        setFuel({} as SelectData)
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Patrimônio cadastrado com sucesso.'
        })
      } catch (error) {
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
        if (error === 'Network Error') {
          addToast({
            type: 'error',
            title: 'Houve um erro ao tentar cadastrar Patrimônio',
            description:
              'Sem conexão com o banco de dados, verifique seu acesso a internet e tente novamente.'
          })
          return
        }
        addToast({
          type: 'error',
          title: 'Ops!',
          description: 'Houve um erro ao cadastrar Patrimônio, tente novamente.'
        })
      }
    },
    [
      fileImage,
      fileList,
      selectedFarm,
      selectedManufacturer,
      selectedPatrimonyGroup,
      signOut
    ]
  )

  const onChangeValue = useCallback(event => {
    setValue(Money.format(event.target.value))
  }, [])

  const onChangeFarm = useCallback(event => {
    setSelectedFarm(event)
  }, [])

  const onChangePatrimonyGroup = useCallback(event => {
    console.log(event)
    setSelectedPatrimonyGroup(event)
  }, [])

  const onChangeManufacturer = useCallback(event => {
    setSelectedManufacturer(event)
  }, [])

  const onChangeFuel = useCallback(event => {
    setFuel(event)
  }, [])

  const handleRemoveImage = useCallback(() => {
    setFileImage(null)
    setLoadingImage(false)
  }, [])

  const onChangeImage = useCallback(event => {
    console.log('entoru na função')
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

  useEffect(() => {
    if (fileList.length > 0) {
      const previewList: string[] = []
      const previewList2: PreviewProps[] = []
      // setFileListPreview([])

      fileList.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          previewList.push(reader.result as string)
          previewList2.push({ data: reader.result as string, file: file })
          setFileListPreview(oldaValue => [
            ...oldaValue,
            reader.result as string
          ])
          setFileListPreviewId(oldaValue => [
            ...oldaValue,
            {
              data: reader.result as string,
              file: file
            }
          ])
        }
        reader.readAsDataURL(file)
      })
      if (previewList.length > 0) {
        setFileListPreview(previewList)
        setFileListPreviewId(previewList2)
      }
    } else {
      setFileListPreview([])
      setFileListPreviewId([])
    }
  }, [fileList])

  const onChangeImages = useCallback(event => {
    if (event.target.files) {
      const { files } = event.target
      const result = Object.keys(files)
      const listItems = result.map(key => {
        return files[parseInt(key, 10)]
      })
      // if (files) {

      //   setFilesImage(files);
      // }
      const list: File[] = []
      listItems.forEach((file: File) => {
        if (file && file.type.substring(0, 5) === 'image') {
          list.push(file)
        }
      })
      if (list.length > 0) {
        setFileList(list)
      }
    }
    setLoadingImage(false)
  }, [])

  const handleRemoveFile = useCallback(
    file => {
      if (fileList) {
        const newArray = fileList.filter(item => {
          if (item !== file) return item
        })
        if (newArray.length > 0) {
          setFileListPreview([])
          setFileListPreviewId([])
          setFileList(newArray)
        } else {
          setFileListPreview([])
          setFileListPreviewId([])
          setFileList([])
        }
      }
    },
    [fileList]
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
        <TitleRegisters>Cadastro de Patromônio</TitleRegisters>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Dados do Patrimônio</span>
              </legend>
            </ConainerTitle>
            <div className="formDubleRight">
              <Input label="Nome" name="name" required />
              <Input label="Descrição" name="description" />
            </div>
            <div className="formTriple">
              <Select
                label="Fazenda"
                name="farm"
                placeholder=""
                isClearable
                // disabled={editAddress}
                options={farms}
                onChange={data => onChangeFarm(data)}
                value={selectedFarm}
              />
              <Select
                label="Grupo Patrimonial"
                name="patrimony_group"
                placeholder=""
                isClearable
                // disabled={editAddress}
                options={patrimonyGroups}
                onChange={data => onChangePatrimonyGroup(data)}
                value={selectedPatrimonyGroup}
              />
              <Input
                label="Código do Patrimônio"
                name="patrimony_code"

                // value={cep}
                // onChange={onChangeCep}
              />
            </div>

            <div className="formTriple">
              <Select
                label="Fabricante"
                name="manufacturer"
                placeholder=""
                isClearable
                // disabled={editAddress}
                options={manufacturers}
                onChange={data => onChangeManufacturer(data)}
                value={selectedManufacturer}
              />
              <Input label="Modelo" name="model" />
              <Input label="Cor" name="color" />
            </div>

            <div className="formTriple">
              <Input label="Número do Motor" name="motor_number" />
              <Input label="Número de Serie" name="serial_number" />
              <Input label="Número do Chassi" name="chassi_number" />
            </div>
            <div className="formTriple">
              <Select
                label="Combustível"
                name="fuel"
                placeholder=""
                isClearable
                // disabled={editAddress}
                options={fuelOptions}
                onChange={data => onChangeFuel(data)}
                value={fuel}
              />
              <Input label="Potência Mín" name="p_min" />
              <Input label="Potência Máx" name="p_max" />
            </div>
            <div className="formTriple">
              <Input
                label="Data de Compra"
                name="acquisition_date"
                type="date"
              />
              <Input
                label="Data de Fabricação"
                name="manufacturing_date"
                type="date"
              />
              <Input label="N° da Nota Fiscal" name="nfe_number" />
            </div>
            <div className="formDubleRight">
              <Input
                label="Valor"
                name="value"
                onChange={onChangeValue}
                value={value}
              />
              <Input label="Observações" name="note" />
            </div>
            {/* <div className="containerImage">
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
                  loadingImage={loadingImage}
                  onChangeFile={onChangeImage}
                  onClick={() => setLoadingImage(true)}
                />
              )}
            </div> */}
            <div className="containerImages">
              {fileListPreviewId.map(file => {
                return (
                  <div className="formDubleRight" key={file.data}>
                    <div className="patrimonyImage">
                      <img src={file.data} />
                      <button
                        onClick={() => handleRemoveFile(file.file)}
                        type="button"
                      >
                        <IoClose size={16} />
                      </button>
                    </div>
                  </div>
                )
              })}

              <InputFile
                loadingImage={loadingImage}
                onChangeFile={onChangeImages}
                onClick={() => setLoadingImage(true)}
              />
            </div>
            {/* <div className="containerImage">
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
                  loadingImage={loadingImage}
                  onChangeFile={onChangeImage}
                  onClick={() => setLoadingImage(true)}
                />
              )}
            </div> */}
          </fieldset>
          <div className="containerButton">
            <Button secundary title="Salvar" type="submit" loading={loading} />
          </div>
        </Form>
      </Content>
    </Container>
  )
}

export default PatrimonyRegister
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const responsePG = await apiClient.get('/patrimonygroup')
  const responseFarm = await apiClient.get('/farm')
  const responseManufacturer = await apiClient.get('/manufacturer')
  const listGP = responsePG.data.map((data: PatrimonyGroupData) => {
    return { value: data.id, label: data.name }
  })
  const listFarms = responseFarm.data.map((farm: FarmData) => {
    return { value: farm.id, label: farm.name }
  })
  const listManufacturers = responseManufacturer.data.map(
    (manufacturer: ManufacturerData) => {
      return { value: manufacturer.id, label: manufacturer.name }
    }
  )

  return {
    props: { listGP, listFarms, listManufacturers }
  }
})
