import React, { useCallback, useEffect, useState } from 'react'

import { listMenusManagerAdm } from '../utils/menusOptions'
import Title from '../components/Title'
import Header from '../components/Header'
import MenuDrawer from '../components/MenuDrawer'
import {
  Container,
  Contant,
  ContainerTitle,
  ContainerButtonTitle
} from '../styles/pages/ListPages'
import { api } from '../server/apiClient'
import Table from '../components/Table'
import PatrimonyData from '../DTO/patrimonyDTO'
import moment from 'moment'
import Money from '../utils/MaskMoney'
import { currency } from '../utils/Formater'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '../hooks/auth'

const listTitle = [
  // 'Imagem',
  'Nome',
  'Descrição',
  'Fazenda',
  'Gp. Patrimonial',
  'Cód. Patrimônio',
  'Fabricante',
  'Modelo',
  'Cor',
  'N° Motor',
  'N° Serie',
  'N° Chassi',
  'Combustível',
  'Potência Min.',
  'Potência Max.',
  'Data de Compra',
  'Data de Fabricação',
  'N° da Nota Fiscal',
  'Valor',
  'Observações'
]
interface PatrimonyGroupProps {
  list: PatrimonyData[]
}
const Patrimonies: React.FC<PatrimonyGroupProps> = ({ list }) => {
  const router = useRouter()
  const { permissions, signOut } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [listPatrimony, setListPatrimony] = useState(list || [])

  const getListPatrimony = useCallback(async () => {
    try {
      const response = await api.get('/patrimonyitem')
      const list = response.data.map((data: PatrimonyData) => {
        return {
          id: data.id,
          // files: data.files && data.files.length > 0 ? data.files[0].path : '',
          name: data.name,
          description: data.description,
          farm_id: data.farm_id ? data.farm.name : '',
          patrimony_group_id: data.patrimony_group_id
            ? data.patrimonyGroup.name
            : '',
          patrimony_code: data.patrimony_code,
          manufacturer_id: data.manufacturer_id ? data.manufacturer.name : '',
          model: data.model,
          color: data.color,
          motor_number: data.motor_number,
          serial_number: data.serial_number,
          chassi_number: data.chassi_number,
          fuel: data.fuel,
          minimum_power: data.minimum_power,
          maximum_power: data.maximum_power,
          acquisition_date: data.acquisition_date
            ? moment(data.acquisition_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
            : '',
          manufacturing_date: data.manufacturing_date
            ? moment(data.manufacturing_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
            : '',
          nfe_number: data.nfe_number,
          value: data.value ? `R$ ${currency(parseFloat(data.value))}` : '',
          note: data.note
        }
      })
      setListPatrimony(list)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        signOut()
      }
    }
  }, [signOut])

  const refreshData = () => {
    // console.log('entrou aqui')
    router.replace(router.asPath)
    getListPatrimony()
  }

  useEffect(() => {
    refreshData()
  }, [])

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])
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
      <Contant>
        <ContainerTitle>
          <Title>Lista de Patrimônios Cadastrados</Title>
          <ContainerButtonTitle>
            {/* <ButtonCircle secundary onClick={handleRegisterUser}>
              <FiPlus color="#fff" size="25px" />
            </ButtonCircle> */}
          </ContainerButtonTitle>
        </ContainerTitle>
        <Table
          listItens={listPatrimony}
          listTitle={listTitle}
          onClickItem={selected => {
            Router.push(`/patrimony-data?id=${selected}`)
          }}
        />
      </Contant>
    </Container>
  )
}

export default Patrimonies
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/patrimonyitem')
  console.log(response.data)
  const list = response.data.map((data: PatrimonyData) => {
    return {
      id: data.id,
      // files: data.files && data.files.length > 0 ? data.files[0].path : '',
      // files: data.files ? data.files : null,
      name: data.name,
      description: data.description,
      farm_id: data.farm_id ? data.farm.name : '',
      patrimony_group_id: data.patrimony_group_id
        ? data.patrimonyGroup.name
        : '',
      patrimony_code: data.patrimony_code,
      manufacturer_id: data.manufacturer_id ? data.manufacturer.name : '',
      model: data.model,
      color: data.color,
      motor_number: data.motor_number,
      serial_number: data.serial_number,
      chassi_number: data.chassi_number,
      fuel: data.fuel,
      minimum_power: data.minimum_power,
      maximum_power: data.maximum_power,
      acquisition_date: data.acquisition_date
        ? moment(data.acquisition_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
        : '',
      manufacturing_date: data.manufacturing_date
        ? moment(data.manufacturing_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
        : '',
      nfe_number: data.nfe_number,
      value: data.value ? `R$ ${currency(parseFloat(data.value))}` : '',
      note: data.note
    }
  })
  return {
    props: { list }
  }
})
