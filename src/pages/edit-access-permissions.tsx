import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import {
  Container,
  Content,
  ConainerTitle,
  TableHeaderFarm,
  TablePermissions,
  TableHeaderTitle,
  TableHeader
} from '../styles/pages/CreateAccessPermission'
import Header from '../components/Header'
import { listMenusSettings } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Button from '../components/Button'
import Select from '../components/Select'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import User from '../DTO/userDTO'
import SelectData from '../DTO/selectDTO'
import PermissionRow from '../components/PermissionRow'
import { useToast } from '../hooks/toast'
import { api } from '../server/apiClient'
import FarmData from '../DTO/farmDTO'
import Input from '../components/Input'
import PermissionData from '../DTO/permissionData'
import { Router } from 'next/router'
import { cnpjMask, cpfMask } from '../utils/Mask'
import { useAuth } from '../hooks/auth'
import { usePreferences } from '../hooks/preferences'

interface FormData {
  user: SelectData
}
interface CreateAccessPermissionsProps {
  userData: User
  listFarms: SelectData[]
  listPermissions: PermissionData[]
  editMode: boolean
}
const CreateAccessPermissions: React.FC<CreateAccessPermissionsProps> = ({
  userData,
  listFarms,
  listPermissions,
  editMode
}) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { permissions, signOut } = useAuth()
  const { theme } = usePreferences()
  const [menuVisible, setMenuVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [edit, setEdit] = useState(editMode || false)
  const [selectedFarm, setSelectedFarm] = useState<SelectData>()
  const [selectedPermission, setSelectedPermission] = useState<PermissionData>()
  const [permissionADMUsers, setPermissionADMUsers] = useState(0)
  const [permissionADMFarms, setPermissionADMFarms] = useState(0)
  const [permissionADMManufactures, setPermissionADMManufactures] = useState(0)
  const [permissionADMPatrimonyGroup, setPermissionADMPatrimonyGroup] =
    useState(0)
  const [permissionADMPatrimony, setPermissionADMPatrimony] = useState(0)
  const [permissionLogbook, setPermissionLogbook] = useState(0)
  const [permissionMaintenanceBook, setPermissionMaintenanceBook] = useState(0)
  const [permissionManagement, setPermissionManagement] = useState(0)

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const handleDelete = useCallback(async id => {
    try {
      await api.delete('permission', {
        params: { id }
      })
      history.back()
      addToast({
        type: 'success',
        title: 'Permissão excluída com sucesso'
      })
    } catch (error) {
      console.log(error.response)
    }
  }, [])

  const handleEditMode = useCallback(() => {
    if (edit) {
      console.log('cancelar edit')
      // setShowTable(false)
      // setSelectedFarm(undefined)
      // setPermissionADMUsers(selectedPermission.p_user)
      // setPermissionADMFarms(selectedPermission.p_farm)
      // setPermissionADMManufactures(selectedPermission.p_manufacture)
      // setPermissionADMPatrimonyGroup(selectedPermission.p_patrimony_group)
      // setPermissionADMPatrimony(selectedPermission.p_patrimony_item)
      // setPermissionLogbook(0)
      // setPermissionMaintenanceBook(0)
      // setPermissionManagement(selectedPermission.p_permission)
      // formRef.current.clearField('farm')
      // formRef.current.reset()
      // voltar tudo para estado inicial

      // setShowTable(false)
      // setSelectedFarm(undefined)
      // formRef.current.clearField('farm')
      // formRef.current.reset()
      history.back()
      // handleChangePermission('admUser', selectedPermission.p_user)
      // setShowTable(false)
      // const filtered = listPermissions.filter(item => {
      //   if (item.farm_id === selectedFarm.value) return item
      // })
      // if (filtered.length > 0) {
      //   console.log('entrou no if de trocar valores')
      //   console.log(filtered)
      //   setSelectedPermission(filtered[0])
      //   setPermissionADMUsers(filtered[0].p_user)
      //   setPermissionADMFarms(filtered[0].p_farm)
      //   setPermissionADMManufactures(filtered[0].p_manufacture)
      //   setPermissionADMPatrimonyGroup(filtered[0].p_patrimony_group)
      //   setPermissionADMPatrimony(filtered[0].p_patrimony_item)
      //   setPermissionLogbook(0)
      //   setPermissionMaintenanceBook(0)
      //   setPermissionManagement(filtered[0].p_permission)
      // }
      // setShowTable(true)
      // setEdit(!edit)
    }

    if (!selectedFarm) {
      addToast({
        type: 'info',
        title: 'Selecione uma fazenda para editar as permissões'
      })
    } else {
      setEdit(!edit)
      setShowTable(true)
    }
  }, [edit, selectedFarm, addToast, listPermissions])

  const onChangeFarm = useCallback(
    data => {
      console.log('changeFarm')
      if (data) {
        setShowTable(false)
        console.log({ data })
        setSelectedFarm(data)
        const filtered = listPermissions.filter(item => {
          if (item.farm_id === data.value) return item
        })
        if (filtered.length > 0) {
          console.log('entrou no if de trocar valores')
          console.log(filtered)
          setSelectedPermission(filtered[0])
          setPermissionADMUsers(filtered[0].p_user)
          setPermissionADMFarms(filtered[0].p_farm)
          setPermissionADMManufactures(filtered[0].p_manufacture)
          setPermissionADMPatrimonyGroup(filtered[0].p_patrimony_group)
          setPermissionADMPatrimony(filtered[0].p_patrimony_item)
          setPermissionLogbook(0)
          setPermissionMaintenanceBook(0)
          setPermissionManagement(filtered[0].p_permission)
          setShowTable(true)
        }
      } else {
        setSelectedFarm(undefined)
        setShowTable(false)
      }
    },
    [userData, listPermissions]
  )

  const handleSubmit = useCallback(async () => {
    if (!selectedFarm) {
      addToast({
        type: 'info',
        title: 'Ops!',
        description: 'Selecione uma Fazenda para salvar a alteração'
      })
      return
    }
    try {
      const permissionData: Record<string, undefined> = {}
      Object.assign(permissionData, { id: selectedPermission.id })

      if (permissionManagement !== selectedPermission.p_permission) {
        Object.assign(permissionData, { p_permission: permissionManagement })
      }
      if (permissionADMUsers !== selectedPermission.p_user) {
        Object.assign(permissionData, { p_user: permissionADMUsers })
      }
      if (permissionADMFarms !== selectedPermission.p_farm) {
        Object.assign(permissionData, { p_farm: permissionADMFarms })
      }
      if (permissionADMManufactures !== selectedPermission.p_manufacture) {
        Object.assign(permissionData, {
          p_manufacture: permissionADMManufactures
        })
      }
      if (
        permissionADMPatrimonyGroup !== selectedPermission.p_patrimony_group
      ) {
        Object.assign(permissionData, {
          p_patrimony_group: permissionADMPatrimonyGroup
        })
      }
      if (permissionADMPatrimony !== selectedPermission.p_patrimony_item) {
        Object.assign(permissionData, {
          p_patrimony_item: permissionADMPatrimony
        })
      }
      console.log(permissionData)
      await api.put('/permission', permissionData)
      // setSelectedFarm(undefined)
      // formRef.current.reset()
      history.back()
      addToast({
        type: 'success',
        title: 'Permissões editadas com sucesso!'
      })
    } catch (error) {
      console.log(error.response)
      if (error.response && error.response.status === 401) {
        signOut()
        return
      }
      console.log(error)
      addToast({
        type: 'error',
        title: 'Ops!',
        description: 'Houve um erro ao editar as permissões, tente novamente.'
      })
    }
  }, [
    userData,
    selectedFarm,
    permissionADMUsers,
    permissionADMFarms,
    permissionADMManufactures,
    permissionADMPatrimonyGroup,
    permissionADMPatrimony,
    permissionLogbook,
    permissionMaintenanceBook,
    permissionManagement
  ])

  const handleChangePermission = useCallback((type: string, number: number) => {
    console.log('change')
    switch (type) {
      case 'admUser':
        setPermissionADMUsers(number)
        break
      case 'admFarm':
        setPermissionADMFarms(number)
        break
      case 'admManufacturer':
        setPermissionADMManufactures(number)
        break
      case 'admPatrimonyGroup':
        setPermissionADMPatrimonyGroup(number)
        break
      case 'admPatrimony':
        setPermissionADMPatrimony(number)
        break
      case 'logbook':
        setPermissionLogbook(number)
        break
      case 'maintenceBook':
        setPermissionMaintenanceBook(number)
        break
      case 'permissionManagement':
        setPermissionManagement(number)
        break

      default:
        break
    }
  }, [])

  return (
    <Container>
      <Head>
        {/* <meta
          name="theme-color"
          content={`${theme === 'light' ? '#fff' : '#203038'}`}
        /> */}
        <title>AgroApp</title>
      </Head>
      <Header menuIcon onClickMenu={handleMenu} profileIcon back></Header>
      <MenuDrawer
        visible={menuVisible}
        listMenus={permissions ? listMenusSettings(permissions) : []}
      />
      <Content>
        <TitleRegisters>Permissão de Usuário - Editar</TitleRegisters>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            farm: { value: '', label: '' }
          }}
        >
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Permissões de Usuário por Fazenda</span>
              </legend>
              {permissions && permissions.p_permission & 4 && (
                <div>
                  {edit && (
                    <Button
                      className="delete"
                      title="Excluir"
                      type="button"
                      onClick={() => handleDelete(selectedPermission.id)}
                    ></Button>
                  )}
                  <Button
                    title={!edit ? 'Editar' : 'Cancelar'}
                    type="button"
                    onClick={() => handleEditMode()}
                  ></Button>
                </div>
              )}
            </ConainerTitle>
            <Input
              label="Usuário"
              name="user"
              placeholder=""
              disabled={true}
              value={userData ? userData.name : ''}
            />
            {listFarms && (
              <Select
                label="Fazenda"
                name="farm"
                placeholder=""
                // isClearable
                disabled={edit}
                options={listFarms}
                onChange={data => onChangeFarm(data)}
                value={selectedFarm}
              />
            )}
          </fieldset>
        </Form>
        {showTable &&
          listPermissions.map(item => {
            if (item.farm_id !== selectedFarm.value) {
              return <></>
            }
            return (
              <>
                <TablePermissions>
                  <TableHeaderFarm>
                    {item.farm.cnpj ? (
                      <strong>
                        {item.farm.name} - {cnpjMask(item.farm.cnpj)}
                      </strong>
                    ) : (
                      <strong>
                        {item.farm.name} - {cpfMask(item.farm.cpf)}
                      </strong>
                    )}
                  </TableHeaderFarm>
                  <TableHeaderTitle>
                    <strong>Administrativo</strong>
                  </TableHeaderTitle>
                  <TableHeader>
                    <div></div>
                    <div>
                      <strong>Visualizar</strong>
                    </div>
                    <div>
                      <strong>Criar</strong>
                    </div>
                    <div>
                      <strong>Editar</strong>
                    </div>
                    <div>
                      <strong>Excluir</strong>
                    </div>
                  </TableHeader>
                  <PermissionRow
                    title="Dados de Usuário"
                    initialValue={item.p_user}
                    onChange={value => handleChangePermission('admUser', value)}
                    disabled={!edit}
                    value={!edit ? item.p_user : permissionADMUsers}
                  ></PermissionRow>
                  <PermissionRow
                    title="Dados de Fazendas"
                    initialValue={item.p_farm}
                    onChange={value => handleChangePermission('admFarm', value)}
                    disabled={!edit}
                  ></PermissionRow>
                  <PermissionRow
                    title="Dados de Fabricantes"
                    initialValue={item.p_manufacture}
                    onChange={value =>
                      handleChangePermission('admManufacturer', value)
                    }
                    disabled={!edit}
                  ></PermissionRow>
                  <PermissionRow
                    title="Dados de Grupo de Patrimônio"
                    initialValue={item.p_patrimony_group}
                    onChange={value =>
                      handleChangePermission('admPatrimonyGroup', value)
                    }
                    disabled={!edit}
                  ></PermissionRow>
                  <PermissionRow
                    title="Dados de Patrimônio"
                    initialValue={item.p_patrimony_item}
                    onChange={value =>
                      handleChangePermission('admPatrimony', value)
                    }
                    disabled={!edit}
                  ></PermissionRow>

                  <TableHeaderTitle>
                    <strong>Operacional - Máquinas</strong>
                  </TableHeaderTitle>
                  <PermissionRow
                    title="Diário de Bordo"
                    onChange={value => handleChangePermission('logbook', value)}
                    disabled={!edit}
                  ></PermissionRow>

                  <PermissionRow
                    title="Informe de Manutenção"
                    onChange={value =>
                      handleChangePermission('maintenceBook', value)
                    }
                    disabled={!edit}
                  ></PermissionRow>

                  <TableHeaderTitle>
                    <strong>Configurações</strong>
                  </TableHeaderTitle>

                  <PermissionRow
                    title="Permissões de Usuário"
                    initialValue={item.p_permission}
                    onChange={value =>
                      handleChangePermission('permissionManagement', value)
                    }
                    disabled={!edit}
                  ></PermissionRow>
                </TablePermissions>
              </>
            )
          })}

        {edit && (
          <div className="containerButtonFooter">
            <Button
              secundary
              title="Salvar"
              type="submit"
              loading={loading}
              onClick={() => formRef.current.submitForm()}
            />
          </div>
        )}
      </Content>
    </Container>
  )
}

export default CreateAccessPermissions
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const editMode = ctx.query.edit === 'true'
  try {
    console.log(ctx.query)
    const response = await apiClient.get('user', {
      params: {
        id: ctx.query.id
      }
    })
    const responsePermissions = await apiClient.get('permission', {
      params: {
        user_id: ctx.query.id
      }
    })
    const userData = response.data[0]
    console.log(responsePermissions.data)

    const listFarms = responsePermissions.data.map((item: PermissionData) => {
      return { value: item.farm.id, label: item.farm.name }
    })

    const listPermissions = responsePermissions.data

    return {
      props: { userData, listFarms, listPermissions, editMode }
    }
  } catch (error) {
    return {
      props: {
        userData: null,
        listFarms: null,
        listPermissions: null,
        editMode
      }
    }
  }
})
