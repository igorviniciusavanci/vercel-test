import React, { useCallback } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'

// import { useLocation, Link } from 'react-router-dom'
import { Container, Title, MenuItem, SubMenuItem } from './styles'

interface Option {
  label: string
  route: string
  subMenu?: SubMenu[]
}

interface SubMenu {
  label: string
  route: string
}

interface Menu {
  title: string
  options: Option[]
}

interface MenuProps {
  title: string
  itens: Option[]
}

interface SubMenuProps {
  title: string
  itens?: SubMenu[]
  route: string
}

interface ContainerProps {
  visible: boolean
  listMenus: Menu[]
}

const SubMenu: React.FC<SubMenuProps> = ({ route, itens, title }) => {
  const router = useRouter()
  return (
    <>
      <Link href={route}>
        <a>
          <MenuItem route={router.asPath} path={route}>
            {title}
          </MenuItem>
        </a>
      </Link>
      {itens &&
        itens.map((menu: Option) => {
          return (
            <SubMenuItem
              route={menu.route}
              path={router.pathname}
              key={menu.label}
            >
              {menu.label}
            </SubMenuItem>
          )
        })}
    </>
  )
}

const Menu: React.FC<MenuProps> = ({ itens, title }) => {
  const handleClickMenu = useCallback(() => {
    Router.push('admin-dash')
  }, [])
  return (
    <>
      <Title key={Math.random()} onClick={handleClickMenu}>
        {title}
      </Title>
      {itens.map((menu: Option) => {
        return (
          <SubMenu
            key={menu.label}
            title={menu.label}
            route={menu.route}
            itens={menu.subMenu}
          />
          // <Link to={menu.route}>
          //   <MenuItem route={menu.route} path={pathName}>
          //     {menu.label}
          //   </MenuItem>
          // </Link>
        )
      })}
    </>
  )
}

const MenuDrawer: React.FC<ContainerProps> = ({ visible, listMenus }) => {
  // const location = useLocation()
  // const pathName = location.pathname
  return (
    <Container visible={visible}>
      {listMenus.map(menus => (
        <Menu key={menus.title} title={menus.title} itens={menus.options} />
      ))}
    </Container>
  )
}

export default MenuDrawer
