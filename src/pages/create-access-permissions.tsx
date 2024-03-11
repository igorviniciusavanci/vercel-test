import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import {
  Container,
  Content,
  ConainerTitle,
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
import { useAuth } from '../hooks/auth'
import { usePreferences } from '../hooks/preferences'
interface CreateAccessPermissionsProps {
  listUsers: SelectData[]
  listFarms: SelectData[]
}
const CreateAccessPermissions: React.FC<CreateAccessPermissionsProps> = ({
  listUsers,
  listFarms
}) => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { theme } = usePreferences()
  const [menuVisible, setMenuVisible] = useState(false)
  const { permissions, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<SelectData[]>(listUsers || [])
  const [selectedUser, setSelectedUser] = useState<SelectData>()
  const [selectedFarm, setSelectedFarm] = useState<SelectData>()
  const [permissionADMUsers, setPermissionADMUsers] = useState(0)
  const [permissionADMFarms, setPermissionADMFarms] = useState(0)
  const [permissionADMManufactures, setPermissionADMManufactures] = useState(0)
  const [permissionADMPatrimonyGroup, setPermissionADMPatrimonyGroup] =
    useState(0)
  const [permissionADMPatrimony, setPermissionADMPatrimony] = useState(0)
  const [permissionLogbook, setPermissionLogbook] = useState(0)
  const [permissionMaintenanceBook, setPermissionMaintenanceBook] = useState(0)
  const [permissionManagement, setPermissionManagement] = useState(0)

  useEffect(() => {
    setUsers(listUsers)
  })
  useEffect(() => {
    async function getAllPermissions(): Promise<void> {
      let response = null
      try {
        response = await api.get('/user', {
          params: {
            haspermission: true
          }
        })
        console.log(response.data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          signOut()
        }
      }
    }
    getAllPermissions()
  }, [])
  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])
  const onChangeUser = useCallback(event => {
    setSelectedUser(event)
  }, [])
  const onChangeFarm = useCallback(event => {
    setSelectedFarm(event)
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!selectedUser || !selectedFarm) {
      addToast({
        type: 'info',
        title: 'Ops!',
        description:
          'Selecione um Usuário e uma Fazenda para salvar a permissão'
      })
      return
    }
    try {
      const permissionData: Record<string, undefined> = {}
      Object.assign(permissionData, { user_id: selectedUser.value })
      Object.assign(permissionData, { farm_id: selectedFarm.value })
      if (permissionManagement > 0) {
        Object.assign(permissionData, { p_permission: permissionManagement })
      }
      if (permissionADMUsers > 0) {
        Object.assign(permissionData, { p_user: permissionADMUsers })
      }
      if (permissionADMFarms > 0) {
        Object.assign(permissionData, { p_farm: permissionADMFarms })
      }
      if (permissionADMManufactures > 0) {
        Object.assign(permissionData, {
          p_manufacture: permissionADMManufactures
        })
      }
      if (permissionADMPatrimonyGroup > 0) {
        Object.assign(permissionData, {
          p_patrimony_group: permissionADMPatrimonyGroup
        })
      }
      if (permissionADMPatrimony > 0) {
        Object.assign(permissionData, {
          p_patrimony_item: permissionADMPatrimony
        })
      }
      setSelectedUser(undefined)
      setSelectedFarm(undefined)
      formRef.current.reset()
      await api.post('/permission', permissionData)
      addToast({
        type: 'success',
        title: 'Permissões criadas com sucesso!'
      })
    } catch (error) {
      console.log(error.response)
      if (error.response && error.response.status === 401) {
        signOut()
        return
      }
      if (error.response && error.response.status === 400) {
        if (
          error.response.data &&
          error.response.data.message === 'Esse Usuario já tem permissão'
        ) {
          addToast({
            type: 'info',
            title: 'Atenção!',
            description:
              'Esse usuario já tem permissão para a fazenda selecionada.'
          })
        }
        return
      }
      addToast({
        type: 'error',
        title: 'Ops!',
        description: 'Houve um erro ao criar a permissão, tente novamente.'
      })
    }
    // console.log(selectedUser)
    // console.log(permissionADMUsers)
    // console.log(permissionADMFarms)
    // console.log(permissionADMManufactures)
    // console.log(permissionADMPatrimonyGroup)
    // console.log(permissionADMPatrimony)
    // console.log(permissionLogbook)
    // console.log(permissionMaintenanceBook)
    // console.log(permissionManagement)
  }, [
    selectedUser,
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
      <Header menuIcon onClickMenu={handleMenu} profileIcon></Header>
      <MenuDrawer
        visible={menuVisible}
        listMenus={permissions ? listMenusSettings(permissions) : []}
      />
      <Content>
        <TitleRegisters>Cadastro de Permissões</TitleRegisters>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>Permissões de Usuário</span>
              </legend>
            </ConainerTitle>
            <Select
              label="Usuário"
              name="user"
              placeholder=""
              isClearable
              // disabled={editAddress}
              options={users}
              onChange={data => onChangeUser(data)}
              value={selectedUser}
            />
            <Select
              label="Fazenda"
              name="farm"
              placeholder=""
              isClearable
              // disabled={editAddress}
              options={listFarms}
              onChange={data => onChangeFarm(data)}
              value={selectedFarm}
            />
          </fieldset>
          {/* <div className="containerButton">
            <Button secundary title="Buscar" type="submit" loading={loading} />
          </div> */}
        </Form>
        <TablePermissions>
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
            onChange={value => handleChangePermission('admUser', value)}
          ></PermissionRow>
          <PermissionRow
            title="Dados de Fazendas"
            onChange={value => handleChangePermission('admFarm', value)}
          ></PermissionRow>
          <PermissionRow
            title="Dados de Fabricantes"
            onChange={value => handleChangePermission('admManufacturer', value)}
          ></PermissionRow>
          <PermissionRow
            title="Dados de Grupo de Patrimônio"
            onChange={value =>
              handleChangePermission('admPatrimonyGroup', value)
            }
          ></PermissionRow>
          <PermissionRow
            title="Dados de Patrimônio"
            onChange={value => handleChangePermission('admPatrimony', value)}
          ></PermissionRow>

          <TableHeaderTitle>
            <strong>Operacional - Máquinas</strong>
          </TableHeaderTitle>
          <PermissionRow
            title="Diário de Bordo"
            onChange={value => handleChangePermission('logbook', value)}
          ></PermissionRow>

          <PermissionRow
            title="Informe de Manutenção"
            onChange={value => handleChangePermission('maintenceBook', value)}
          ></PermissionRow>

          <TableHeaderTitle>
            <strong>Configurações</strong>
          </TableHeaderTitle>

          <PermissionRow
            title="Permissões de Usuário"
            onChange={value =>
              handleChangePermission('permissionManagement', value)
            }
          ></PermissionRow>
        </TablePermissions>
        <div className="containerButtonFooter">
          <Button
            secundary
            title="Salvar"
            type="submit"
            loading={loading}
            onClick={() => formRef.current.submitForm()}
          />
        </div>
      </Content>
    </Container>
  )
}

export default CreateAccessPermissions
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const responseUsers = await apiClient.get('/user')
  const responseFarm = await apiClient.get('/farm')
  const listUsers = responseUsers.data.map((data: User) => {
    return { value: data.id, label: data.name }
  })

  const listFarms = responseFarm.data.map((farm: FarmData) => {
    return { value: farm.id, label: farm.name }
  })

  return {
    props: { listUsers, listFarms }
  }
})
