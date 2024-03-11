import React, { useCallback, useRef, useState } from 'react'
import Head from 'next/head'
import { IoClose } from 'react-icons/io5'
import { MdAddAPhoto } from 'react-icons/md'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useToast } from '../hooks/toast'
import { listMenusManagerAdm } from '../utils/menusOptions'
import getValidationsErrors from '../utils/getValidationErrors'
import {
  Container,
  Content,
  ConainerTitle,
  ButtonAddPhoto
} from '../styles/pages/ShowDataPages'
import Header from '../components/Header'
import Button from '../components/Button'
import TitleRegisters from '../components/TitleRegisters'
import Input from '../components/Input'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import MenuDrawer from '../components/MenuDrawer'
import PatrimonyData from '../DTO/patrimonyDTO'
import PatrimonyGroupData from '../DTO/patrimonyGroupDTO'
import FarmData from '../DTO/farmDTO'
import ManufacturerData from '../DTO/manufacturerDTO'
import Money from '../utils/MaskMoney'
import Select from '../components/Select'
import SelectData from '../DTO/selectDTO'
import { convert } from '../utils/FormaterMoney'
import { api } from '../server/apiClient'
import { useAuth } from '../hooks/auth'
import { fuelOptions } from '../utils/listOptions'

interface PatrimonyFormData {
  id: string
  name: string
  description: string
  color: string
  patrimony_code: string
  acquisition_date: string
  manufacturing_date: string
  farm: SelectData
  model: string
  motor_number: string
  serial_number: string
  chassi_number: string
  fuel: SelectData
  nfe_number: string
  note: string
  minimum_power: string
  maximum_power: string
  patrimonyGroup: SelectData
  manufacturer: SelectData
  value: string
}

interface PatrimonyDataProps {
  listGP: SelectData[]
  listFarms: SelectData[]
  listManufacturers: SelectData[]
  patrimonyData: PatrimonyData
}
const Patrimony: React.FC<PatrimonyDataProps> = ({
  listGP,
  listFarms,
  listManufacturers,
  patrimonyData
}) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(true)
  const [pathImage, setPathImage] = useState(
    patrimonyData && patrimonyData.files && patrimonyData.files.length > 0
      ? patrimonyData.files
      : null
  )
  const [idFileImage, setIdFileImage] = useState(
    patrimonyData && patrimonyData.files && patrimonyData.files.length > 0
      ? patrimonyData.files[0].id
      : ''
  )
  const [loadingImage, setLoadingImage] = useState(false)
  const [value, setValue] = useState(
    patrimonyData.value ? convert(parseFloat(patrimonyData.value)) : 0
  )

  const convertForSelect = (data: { id: string; name: string }) => {
    return {
      value: data.id,
      label: data.name
    }
  }

  const [selectFarm, setSelectFarm] = useState(
    patrimonyData.farm && patrimonyData.farm.id
      ? convertForSelect(patrimonyData.farm)
      : ({} as SelectData)
  )

  const [selectFuel, setSelectFuel] = useState(
    patrimonyData.fuel
      ? convertForSelect({ id: patrimonyData.fuel, name: patrimonyData.fuel })
      : ({} as SelectData)
  )

  const [selectPG, setSelectPG] = useState(
    patrimonyData.patrimonyGroup && patrimonyData.patrimonyGroup.id
      ? convertForSelect(patrimonyData.patrimonyGroup)
      : ({} as SelectData)
  )

  const [selectManufacturer, setSelectManufacturer] = useState(
    patrimonyData.manufacturer && patrimonyData.manufacturer.id
      ? convertForSelect(patrimonyData.manufacturer)
      : ({} as SelectData)
  )
  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])
  const onChangeValue = useCallback(event => {
    setValue(event.target.value)
  }, [])
  const onChangeSelect = useCallback((item, type) => {
    console.log(item, type)
    switch (type) {
      case 'farm':
        setSelectFarm(item)
        break
      case 'fuel':
        setSelectFuel(item)
        break
      case 'patrimony_group':
        setSelectPG(item)
        break
      case 'manufacturer':
        setSelectManufacturer(item)
        break
      default:
        break
    }
  }, [])
  const handleEditMode = useCallback(status => {
    setEdit(oldValue => !oldValue)
    if (!status) {
      formRef.current.setData({
        name: patrimonyData.name,
        description: patrimonyData.description,
        patrimony_code: patrimonyData.patrimony_code,
        model: patrimonyData.model,
        color: patrimonyData.color,
        motor_number: patrimonyData.motor_number,
        serial_number: patrimonyData.serial_number,
        chassi_number: patrimonyData.chassi_number,
        fuel: patrimonyData.fuel,
        minimum_power: patrimonyData.minimum_power,
        maximum_power: patrimonyData.maximum_power,
        acquisition_date: patrimonyData.acquisition_date
          ? patrimonyData.acquisition_date.substring(0, 10)
          : null,
        manufacturing_date: patrimonyData.manufacturing_date
          ? patrimonyData.manufacturing_date.substring(0, 10)
          : null,
        nfe_number: patrimonyData.nfe_number,
        note: patrimonyData.note
      })
      setValue(
        patrimonyData.value ? convert(parseFloat(patrimonyData.value)) : 0
      )
      setSelectFarm(
        patrimonyData.farm && patrimonyData.farm.id
          ? convertForSelect(patrimonyData.farm)
          : ({} as SelectData)
      )
      setSelectPG(
        patrimonyData.patrimonyGroup && patrimonyData.patrimonyGroup.id
          ? convertForSelect(patrimonyData.patrimonyGroup)
          : ({} as SelectData)
      )
      setSelectManufacturer(
        patrimonyData.manufacturer && patrimonyData.manufacturer.id
          ? convertForSelect(patrimonyData.manufacturer)
          : ({} as SelectData)
      )
    }
  }, [])

  const isEmpty = (obj: PatrimonyData): boolean => {
    return Object.keys(obj).length === 0
  }

  const handleSubmit = useCallback(
    async (data: PatrimonyFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const yupSchema = {
          name: Yup.string().required('Nome obrigatório')
        }
        const schema = Yup.object().shape(yupSchema)
        await schema.validate(data, { abortEarly: false })

        const filds: PatrimonyData = {} as PatrimonyData
        if (data.name && data.name !== patrimonyData.name) {
          Object.assign(filds, { name: data.name })
        }
        if (
          data.description &&
          data.description !== patrimonyData.description
        ) {
          Object.assign(filds, { description: data.description })
        }
        if (data.color && data.color !== patrimonyData.color) {
          Object.assign(filds, { color: data.color })
        }
        if (
          data.patrimony_code &&
          data.patrimony_code !== patrimonyData.patrimony_code
        ) {
          Object.assign(filds, { patrimony_code: data.patrimony_code })
        }
        if (
          selectFarm &&
          selectFarm.value &&
          selectFarm.value !== patrimonyData.farm_id
        ) {
          Object.assign(filds, { farm_id: selectFarm.value })
        }
        if (
          selectPG &&
          selectPG.value &&
          selectPG.value !== patrimonyData.patrimony_group_id
        ) {
          Object.assign(filds, { patrimony_group_id: selectPG.value })
        }
        if (
          selectManufacturer &&
          selectManufacturer.value &&
          selectManufacturer.value !== patrimonyData.manufacturer_id
        ) {
          Object.assign(filds, { manufacturer_id: selectManufacturer.value })
        }
        if (data.model && data.model !== patrimonyData.model) {
          Object.assign(filds, { model: data.model })
        }
        if (
          data.motor_number &&
          data.motor_number !== patrimonyData.motor_number
        ) {
          Object.assign(filds, { motor_number: data.motor_number })
        }
        if (
          data.serial_number &&
          data.serial_number !== patrimonyData.serial_number
        ) {
          Object.assign(filds, { serial_number: data.serial_number })
        }
        if (
          data.chassi_number &&
          data.chassi_number !== patrimonyData.chassi_number
        ) {
          Object.assign(filds, { chassi_number: data.chassi_number })
        }
        if (selectFuel && selectFuel.value !== patrimonyData.fuel) {
          Object.assign(filds, { fuel: selectFuel.value })
        }
        // if (data.fuel && data.fuel !== patrimonyData.fuel) {
        //   Object.assign(filds, { fuel: data.fuel })
        // }
        if (data.nfe_number && data.nfe_number !== patrimonyData.nfe_number) {
          Object.assign(filds, { nfe_number: data.nfe_number })
        }
        if (data.note && data.note !== patrimonyData.note) {
          Object.assign(filds, { note: data.note })
        }
        if (
          data.minimum_power &&
          data.minimum_power !== patrimonyData.minimum_power
        ) {
          Object.assign(filds, { minimum_power: data.minimum_power })
        }
        if (
          data.maximum_power &&
          data.maximum_power !== patrimonyData.maximum_power
        ) {
          Object.assign(filds, { maximum_power: data.maximum_power })
        }
        if (
          data.value &&
          Money.strip(convert(parseFloat(patrimonyData.value)).toString()) !==
            Money.strip(data.value)
        ) {
          Object.assign(filds, { value: Money.strip(data.value) })
        }
        if (
          data.acquisition_date &&
          data.acquisition_date.toString() !==
            (patrimonyData.acquisition_date &&
              patrimonyData.acquisition_date.substring(0, 10))
        ) {
          Object.assign(filds, { acquisition_date: data.acquisition_date })
        }
        if (
          data.manufacturing_date &&
          data.manufacturing_date.toString() !==
            (patrimonyData.manufacturing_date &&
              patrimonyData.manufacturing_date.substring(0, 10))
        ) {
          Object.assign(filds, { birthday: data.manufacturing_date })
        }

        if (!isEmpty(filds)) {
          Object.assign(filds, { id: patrimonyData.id })
          console.log(filds)
          await api.put('patrimonyitem', filds)
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
    [signOut, selectFuel, selectFarm, selectManufacturer, selectPG]
  )

  const handleRemoveImage = useCallback(
    async id => {
      try {
        await api.delete(`files?id=${id}`)
        const responsePatrimony = await api.get('/patrimonyitem', {
          params: { id: patrimonyData.id }
        })
        setPathImage(responsePatrimony.data[0].files)
        setEdit(true)
        addToast({
          type: 'success',
          title: 'Imagem removida com sucesso'
        })
        setEdit(true)
      } catch (error) {
        console.log(error)
        console.log(error.response)
      }
    },
    [addToast, patrimonyData.id]
  )

  const onChangeImage = useCallback(
    async event => {
      const file: File[] = event.target.files
      try {
        if (file && file.length > 0) {
          try {
            for (let index = 0; index < file.length; index++) {
              const fildData = new FormData()
              fildData.append('patrimony_item_id', patrimonyData.id)
              fildData.append('files', file[index])

              await api.post('files', fildData)
              const responsePatrimony = await api.get('/patrimonyitem', {
                params: { id: patrimonyData.id }
              })
              console.log(responsePatrimony.data[0])
              setPathImage(responsePatrimony.data[0].files)
            }
          } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 401) {
              signOut()
            }
          }
        }

        // const result = await api.post('files', fildData)
        // setPathImage(result.data.path)
        // setIdFileImage(result.data.id)
        // setEdit(true)
        // addToast({
        //   type: 'success',
        //   title: 'Imagems inseridas com sucesso'
        // })
      } catch (error) {
        console.log({ erroImage: error.response })
      }
      setLoadingImage(false)
    },
    [patrimonyData]
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
        <TitleRegisters>Patrimônio Cadastrado</TitleRegisters>

        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: patrimonyData.name,
            description: patrimonyData.description,
            patrimony_code: patrimonyData.patrimony_code,
            model: patrimonyData.model,
            color: patrimonyData.color,
            motor_number: patrimonyData.motor_number,
            serial_number: patrimonyData.serial_number,
            chassi_number: patrimonyData.chassi_number,
            fuel: patrimonyData.fuel,
            minimum_power: patrimonyData.minimum_power,
            maximum_power: patrimonyData.maximum_power,
            acquisition_date: patrimonyData.acquisition_date
              ? patrimonyData.acquisition_date.substring(0, 10)
              : null,
            manufacturing_date: patrimonyData.manufacturing_date
              ? patrimonyData.manufacturing_date.substring(0, 10)
              : null,
            nfe_number: patrimonyData.nfe_number,
            note: patrimonyData.note
          }}
        >
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Dados do Patrimônio</span>
              </legend>
              {permissions && permissions.p_user & 4 && (
                <Button
                  title={edit ? 'Editar' : 'Cancelar'}
                  type="button"
                  onClick={() => handleEditMode(edit)}
                ></Button>
              )}
            </ConainerTitle>
            <div className="formDubleRight">
              <Input label="Nome" name="name" required disabled={edit} />
              <Input label="Descrição" name="description" disabled={edit} />
            </div>
            <div className="formTriple">
              <Select
                label="Fazenda"
                name="farm"
                placeholder=""
                isClearable
                value={selectFarm}
                disabled={edit}
                options={listFarms}
                onChange={item => onChangeSelect(item, 'farm')}
              />
              <Select
                label="Grupo Patrimonial"
                name="patrimony_group"
                placeholder=""
                isClearable
                value={selectPG}
                disabled={edit}
                options={listGP}
                onChange={item => onChangeSelect(item, 'patrimony_group')}
              />
              <Input
                label="Código do Patrimônio"
                name="patrimony_code"
                disabled={edit}
              />
            </div>

            <div className="formTriple">
              <Select
                label="Fabricante"
                name="manufacturer"
                placeholder=""
                isClearable
                value={selectManufacturer}
                disabled={edit}
                options={listManufacturers}
                onChange={item => onChangeSelect(item, 'manufacturer')}
              />
              <Input label="Modelo" name="model" disabled={edit} />
              <Input label="Cor" name="color" disabled={edit} />
            </div>

            <div className="formTriple">
              <Input
                label="Número do Motor"
                name="motor_number"
                disabled={edit}
              />
              <Input
                label="Número de Serie"
                name="serial_number"
                disabled={edit}
              />
              <Input
                label="Número do Chassi"
                name="chassi_number"
                disabled={edit}
              />
            </div>
            <div className="formTriple">
              <Select
                label="Combustível"
                name="fuel"
                placeholder=""
                isClearable
                // disabled={editAddress}
                options={fuelOptions}
                onChange={item => onChangeSelect(item, 'fuel')}
                value={selectFuel}
                disabled={edit}
              />
              {/* <Input label="Combustível" name="fuel" disabled={edit} /> */}
              <Input
                label="Potência Mín"
                name="minimum_power"
                disabled={edit}
              />
              <Input
                label="Potência Máx"
                name="maximum_power"
                disabled={edit}
              />
            </div>
            <div className="formTriple">
              <Input
                label="Data de Compra"
                name="acquisition_date"
                type="date"
                disabled={edit}
              />
              <Input
                label="Data de Fabricação"
                name="manufacturing_date"
                type="date"
                disabled={edit}
              />
              <Input
                label="N° da Nota Fiscal"
                name="nfe_number"
                disabled={edit}
              />
            </div>
            <div className="formDubleRight">
              <Input
                label="Valor"
                name="value"
                onChange={onChangeValue}
                value={Money.format(value.toString())}
                disabled={edit}
              />
              <Input label="Observações" name="note" disabled={edit} />
            </div>
            <div className="containerImages">
              {pathImage &&
                pathImage.map(file => {
                  return (
                    <div className="patrimonyImage" key={file.id}>
                      <a
                        href={`https://agroappfiles.s3.amazonaws.com/${file.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`https://agroappfiles.s3.amazonaws.com/${file.path}`}
                        />
                      </a>
                      {!edit && (
                        <button
                          onClick={() => handleRemoveImage(file.id)}
                          type="button"
                        >
                          <IoClose size={16} />
                        </button>
                      )}
                    </div>
                  )
                })}
              {!edit && (
                <ButtonAddPhoto>
                  {loadingImage ? (
                    <i className="fa fa-circle-o-notch fa-spin" />
                  ) : (
                    <MdAddAPhoto size={20} />
                  )}
                  <input
                    type="file"
                    name="arquivo"
                    id="arquivo"
                    multiple
                    accept="image/*"
                    onChange={onChangeImage}
                    onClick={() => setLoadingImage(true)}
                  />
                </ButtonAddPhoto>
              )}
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

export default Patrimony
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

  const responsePatrimony = await apiClient.get('/patrimonyitem', {
    params: ctx.query
  })
  const patrimonyData = responsePatrimony.data[0]
  console.log(patrimonyData)
  return {
    props: { listGP, listFarms, listManufacturers, patrimonyData }
  }
})
