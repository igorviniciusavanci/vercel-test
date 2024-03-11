import React, { useCallback, useEffect, useState } from 'react'
import Router from 'next/router'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { CgArrowLongLeft } from 'react-icons/cg'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { MdLoop } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import Image from 'next/image'
import logoImage from '../../assets/images/agrologoLight.png'

import {
  FixedContainer,
  Container,
  HeaderTop,
  HeaderContainer,
  ButtonBack,
  HeaderButtonMenu,
  HeaderButtonProfile,
  SignIn,
  Nav,
  LogOut,
  UserData,
  ButtonLogOut,
  ButtonChangePass,
  ContainerTheme
} from './styles'
import Link from 'next/link'
import { useAuth } from '../../hooks/auth'
import { cpfMask } from '../../utils/Mask'
import ToggleButton from '../ToggleButton'
import { usePreferences } from '../../hooks/preferences'
import FarmData from '../../DTO/farmDTO'

interface HeaderProps {
  menuIcon?: boolean
  back?: boolean
  profileIcon?: boolean
  navigation?: boolean
  onClickMenu?(): void
}

const Header: React.FC<HeaderProps> = ({
  menuIcon,
  back,
  profileIcon,
  navigation,
  children,
  onClickMenu
}) => {
  const { user, signOut, farm } = useAuth()
  const { setPreferences, theme } = usePreferences()
  const [openLogOut, setOpenLogOut] = useState(false)
  const [farmData, setFarmData] = useState({ name: '' })

  const onClickProfile = useCallback(() => {
    setOpenLogOut(!openLogOut)
  }, [openLogOut])

  useEffect(() => {
    setFarmData(farm)
  }, [farm])

  const toggleTheme = () => {
    theme === 'light'
      ? setPreferences({ theme: 'dark' })
      : setPreferences({ theme: 'light' })
  }

  const handleBack = useCallback(() => {
    Router.back()
  }, [])

  const handleChangePassword = useCallback(() => {
    Router.push('/password-edit')
  }, [])

  const handleChangeFarm = useCallback(() => {
    Router.push('/farms')
  }, [])

  const handleSignOut = useCallback(() => {
    signOut()
  }, [signOut])

  return (
    <FixedContainer>
      <Container back={back}>
        <HeaderTop>
          <HeaderContainer>
            <div>
              {menuIcon && (
                <HeaderButtonMenu onClick={onClickMenu}>
                  <FiMenu size="25px" />
                </HeaderButtonMenu>
              )}
              <Link href={'/dashboard'}>
                <a>
                  <Image src={logoImage} width="80" height="51" priority />
                </a>
              </Link>
              {farmData && <strong>{farmData.name}</strong>}
            </div>
            {back && (
              <ButtonBack type="button" onClick={handleBack}>
                <CgArrowLongLeft size="25px" />
                <span>Voltar</span>
              </ButtonBack>
            )}
          </HeaderContainer>
          {profileIcon && (
            <HeaderButtonProfile onClick={onClickProfile} active={openLogOut}>
              <FaUserCircle size="40px" />
            </HeaderButtonProfile>
          )}
          {navigation && (
            <Nav>
              {/* <Link to="signin">Projetos</Link>
          <Spacer>|</Spacer>
          <Link to="signin">Sobre nós</Link>
          <Spacer>|</Spacer> */}
              <a>
                <SignIn>Login</SignIn>
              </a>
            </Nav>
          )}
          <LogOut visible={openLogOut}>
            <div>
              <UserData>
                {user && user.name && (
                  <strong className="user">{user.name}</strong>
                )}
                {user && user.cpf && (
                  <strong className="user">{cpfMask(user.cpf)}</strong>
                )}
              </UserData>
              <ContainerTheme>
                <strong>Alterar Tema</strong>
                <ToggleButton onChange={toggleTheme} />
              </ContainerTheme>
              <ButtonChangePass onClick={handleChangeFarm}>
                <MdLoop size="20px" />
                Trocar de Fazenda
              </ButtonChangePass>
              <ButtonChangePass onClick={handleChangePassword}>
                <HiOutlineLockClosed size="20px" />
                Alterar Senha
              </ButtonChangePass>

              <div className="footer" />
              {/* <div className="footer" /> */}
              <ButtonLogOut onClick={handleSignOut}>
                <FiLogOut size="20px" />
                Sair
              </ButtonLogOut>
            </div>
          </LogOut>
        </HeaderTop>
        {children}
      </Container>
    </FixedContainer>
  )
}

export default Header
