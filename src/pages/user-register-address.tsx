import React, { useCallback, useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import logo from '../assets/images/agrologoLight.png'
// import logo from '../../public/icons/icon-512x512.png'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Container, Content } from '../styles/pages/RegisterPages'
import Input from '../components/Input'
import Button from '../components/Button'
import Header from '../components/Header'
import { listMenusExemple, listMenusManager } from '../utils/menusOptions'
import MenuDrawer from '../components/MenuDrawer'
import TitleRegisters from '../components/TitleRegisters'
import { withSSRAuth } from '../hocs/withSSRAuth'

const UserRegister: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [menuVisible, setMenuVisible] = useState(false)

  const handleMenuVisible = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const handleMenu = useCallback(() => {
    setMenuVisible(!menuVisible)
  }, [menuVisible])

  const handleMenuDrawer = () => {
    // switch (user.permission[0]) {
    switch ('Administrador') {
      case 'Administrador':
        return listMenusManager

      default:
        return listMenusExemple
    }
  }

  return (
    <Container>
      <Head>
        <title>AgroApp</title>
      </Head>
      <Header menuIcon onClickMenu={handleMenu}></Header>
      {/* <Header profileIcon back menuIcon onClickMenu={handleMenu} /> */}
      <MenuDrawer visible={menuVisible} listMenus={handleMenuDrawer()} />
      <Content>
        <TitleRegisters>Endereço do Usuário</TitleRegisters>
        <Form ref={formRef} onSubmit={() => console.log('submitform')}>
          {/* <fieldset>
            <legend>Dados Pessoais</legend>
            <Input label="Nome Completo" name="name" required />
            <div className="containermetaDubleLeft"></div>
            <div className="formTriple">
              <Input
                label="CPF"
                name="cpf"
                required
                // value={cpf}
                // onChange={onChangeCpf}
              />
              <Input label="RG" name="rg" />
              <Input label="Data de Nascimento" type="date" name="birthday" />
            </div>
            <div className="containermetaDubleLeft">
              <Input label="Email" name="email" />
              <Input
                label="Telefone"
                name="phone"
                // value={phone}
                // onChange={onChangePhone}
              />
            </div>
          </fieldset> */}

          <fieldset>
            <legend>
              Dados de Endereço
              {/* <div>
                <ButtonInputCheck type="button" onClick={handleEditAddress}>
                  <span>Informar endereço</span>
                  {editAddress ? (
                    <FiSquare />
                  ) : (
                    <FiCheckSquare color="#ff9400" />
                  )}
                </ButtonInputCheck>
              </div> */}
            </legend>
            <div className="containermetaDubleLeft">
              <Input label="Logradouro" name="address" required />
              <Input label="Número" name="number" required />
            </div>
            <div className="containermetaDubleLeft">
              <Input label="Complemento" name="complement" />
              <Input
                label="Cep"
                name="postalCode"
                required
                // value={cep}
                // onChange={onChangeCep}
              />
            </div>
            <Input label="Bairro" name="neighborhood" required />
            <div className="formTriple">
              <Input label="Estado" name="neighborhood" required />
              <Input label="Cidade" name="neighborhood" required />
              {/* <Select
                label="Estado"
                name="state"
                required
                disabled={editAddress}
                options={stateList}
                onChange={(e: object) => onchangeState(e)}
              />
              <Select
                label="Cidade"
                name="city"
                required
                disabled={editAddress}
                options={ciyList}
              /> */}
            </div>
          </fieldset>
          <div className="containerButton">
            <Button secundary title="Salvar" type="submit" />
          </div>
        </Form>
      </Content>
    </Container>
  )
}

export default UserRegister
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
