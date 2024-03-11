import React, { useCallback, useRef, useState } from 'react'
import Head from 'next/head'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { format } from 'date-fns'
import moment from 'moment'
import {
  Container,
  Content,
  ConainerTitle,
  ContainerUserHistoric,
  Item,
  ContainerRegisters,
  Register,
  RegisterValue,
  UserData,
  Day,
  Name,
  Cpf,
  ContainerButtons
} from '../styles/pages/CheckInHistoric'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { listMenusOparation, listMenusSettings } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import Header from '../components/Header'
import ButtonCircle from '../components/ButtonCircle'
import { withSSRAuth } from '../hocs/withSSRAuth'
import { setupAPIClient } from '../server/api'
import User from '../DTO/userDTO'
import { cpfMask } from '../utils/Mask'
import Router, { useRouter } from 'next/router'
import { useAuth } from '../hooks/auth'
import TitleRegisters from '../components/TitleRegisters'
import Select from '../components/Select'
import Button from '../components/Button'
import { FormHandles } from '@unform/core'
import SelectData from '../DTO/selectDTO'
import { useToast } from '../hooks/toast'
import getValidationsErrors from '../utils/getValidationErrors'
import { api } from '../server/apiClient'
import ChechInData from '../DTO/checkInDTO'

interface CheckInHistoricProps {
  listUsers: SelectData[]
}
interface UserCheckinData {
  user: User
  days: ChechInData[][]
}
const CheckInHistoric: React.FC<CheckInHistoricProps> = ({ listUsers }) => {
  const router = useRouter()
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { user, farmId, signOut } = useAuth()
  const { permissions } = useAuth()
  const [menuVisible, setMenuVisible] = useState(false)
  const [list, setList] = useState(listUsers)
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<SelectData>()
  const [userCheckinData, setUserCheckinData] = useState<UserCheckinData>(
    {} as UserCheckinData
  )

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const handleSubmit = useCallback(
    async (data: { user: SelectData }) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        if (!selectedUser) {
          const yupSchema = {
            user: Yup.string().required('Operador Obrigatório')
          }
          const schema = Yup.object().shape(yupSchema)

          await schema.validate(data, { abortEarly: false })
          return
        }
        const filds: Record<string, undefined> = {}
        Object.assign(filds, { user_id: selectedUser.value })
        // const fDate = format(new Date(), 'yyyy-MM-dd')
        // console.log(fDate)
        const response = await api.get('/checkin', {
          params: {
            user_id: user.id
          }
        })
        console.log(response.data)

        const newStructure: UserCheckinData = {} as UserCheckinData
        const checkinStructure: Record<string, undefined> = {}
        const checkinStructureList = []
        Object.assign(newStructure, { user: response.data[0].user })
        // Object.assign(newStructure, { days: checkinStructureList })
        // console.log(newStructure)

        response.data.forEach((element: ChechInData, index) => {
          const dateSubstring = element.initial_date.substring(0, 10)
          console.log(dateSubstring)
          if (dateSubstring in checkinStructure) {
            // console.log('já tem')
            const array: ChechInData[] = checkinStructure[dateSubstring]
            // console.log('###################')
            // console.log(checkinStructure)
            // console.log('###################')
            if (array) {
              array.push(element)
              // console.log({ array })
              // console.log({ index })
              // console.log(checkinStructure[element.initial_date])
              // checkinStructure[index][element.initial_date] = array
            }
          } else {
            Object.assign(checkinStructure, {
              [dateSubstring]: [element]
            })
          }
          // if (checkinStructureList.length > 0) {
          //   checkinStructureList.forEach(item => {
          //     // console.log(item)
          //     if (item.initial_date in checkinStructure) {
          //       // console.log('já tem')
          //       const array: ChechInData[] =
          //         checkinStructure[element.initial_date]
          //       if (array) {
          //         array.push(element)
          //         // console.log({ array })
          //       }
          //     } else {
          //       Object.assign(checkinStructure, {
          //         [element.initial_date]: [element]
          //       })
          //     }
          //   })
          // } else {
          //   Object.assign(checkinStructure, {
          //     [element.initial_date]: [element]
          //   })
          //   checkinStructureList.push(checkinStructure)
          // }
        })

        const newArray = []
        Object.keys(checkinStructure).forEach(function (item) {
          newArray.push(checkinStructure[item])
          // console.log()
        })
        Object.assign(newStructure, { days: newArray })
        console.log(newStructure)

        setUserCheckinData(newStructure)
        setLoading(false)
      } catch (error) {
        setLoading(false)
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
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message
        ) {
          addToast({
            type: 'error',
            title: 'Ops!',
            description: `${error.response.data.message}`
          })

          return
        }
        if (error === 'Network Error') {
          addToast({
            type: 'error',
            title: 'Houve um erro ao tentar cadastrar grupo de patrimônio',
            description:
              'Sem conexão com o banco de dados, verifique seu acesso a internet e tente novamente.'
          })

          return
        }
        addToast({
          type: 'error',
          title: 'Ops!',
          description:
            'Houve um erro ao cadastrar grupo de patrimônio, tente novamente.'
        })
      }
    },
    [selectedUser, user, signOut]
  )

  const handleChangeUser = useCallback(data => {
    if (data) {
      setSelectedUser(data)
    } else {
      setSelectedUser(null)
    }
  }, [])

  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Header menuIcon onClickMenu={handleMenu} profileIcon></Header>
      <MenuDrawer visible={menuVisible} listMenus={listMenusOparation} />
      <Content>
        <div className="title">
          <strong>Histórico de Check-in</strong>
        </div>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <fieldset>
            <ConainerTitle>
              <legend>
                <span>
                  Histórico de operação em máquinas por operador por mês
                </span>
              </legend>
            </ConainerTitle>
            <div className="selectWithButton">
              <Select
                required
                label="Operador"
                name="user"
                placeholder=""
                isClearable
                options={list || []}
                value={selectedUser}
                onChange={handleChangeUser}
              />
            </div>
            <div className="containerButton">
              <Button
                secundary
                title="Buscar"
                type="submit"
                loading={loading}
              />
            </div>
          </fieldset>
        </Form>
        {userCheckinData && userCheckinData.user && (
          <ContainerUserHistoric>
            <UserData>
              <Name>{userCheckinData.user.name}</Name>
              <Cpf>{cpfMask(userCheckinData.user.cpf)}</Cpf>
            </UserData>
            {userCheckinData.days.map((item, index) => {
              return (
                <Item
                  key={index.toString()}
                  onClick={() => {
                    // Router.push(
                    //   `edit-access-permissions?id=${item.id}&edit=${false}`
                    // )
                  }}
                >
                  <Day>{`${moment(item[0].initial_date, 'YYYY-MM-DD').format(
                    'DD/MM/YYYY'
                  )}`}</Day>
                  <ContainerRegisters>
                    {item.map(chkData => {
                      return (
                        <Register key={chkData.id}>
                          <RegisterValue>
                            {`${chkData.initial_date.substring(11, 16)}`}
                          </RegisterValue>
                          {chkData.final_date ? (
                            <RegisterValue>
                              {`${chkData.final_date.substring(11, 16)}`}
                            </RegisterValue>
                          ) : (
                            <RegisterValue>- -</RegisterValue>
                          )}
                          <RegisterValue>
                            {chkData.patrimony_item.name}
                          </RegisterValue>
                        </Register>
                      )
                    })}
                  </ContainerRegisters>

                  <ContainerButtons>
                    {permissions && permissions.p_permission & 4 && (
                      <ButtonCircle
                        className="edit"
                        onClick={() => {
                          // Router.push(
                          //   `edit-access-permissions?id=${
                          //     item.id
                          //   }&edit=${false}`
                          // )
                        }}
                      >
                        <AiOutlineEdit size={20}></AiOutlineEdit>
                      </ButtonCircle>
                    )}

                    {/* <ButtonCircle className="remove">
                  <AiOutlineDelete size={20}></AiOutlineDelete>
                </ButtonCircle> */}
                  </ContainerButtons>
                </Item>
              )
            })}
          </ContainerUserHistoric>
        )}
      </Content>
    </Container>
  )
}

export default CheckInHistoric
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const responseUsers = await apiClient.get('/user', {
    params: {
      haspermission: true
    }
  })

  const listUsers = responseUsers.data.map((data: User) => {
    return {
      id: data.id,
      name: data.name,
      cpf: data.cpf,
      value: data.id,
      label: data.name
    }
  })
  return {
    props: { listUsers }
  }
})
