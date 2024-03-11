import styled, { css } from 'styled-components'

interface ContainerProps {
  visible: boolean
}

interface MenuItemProps {
  route: string
  path: string
}

export const Container = styled.div<ContainerProps>`
  visibility: hidden;
  min-height: 100%;
  width: 30rem;
  background: ${props => props.theme.colors.background};
  position: fixed;
  top: 0;
  padding: 15.5vh 2rem 3rem 2rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${props => props.theme.colors.border_base};
  border-bottom: 1px solid ${props => props.theme.colors.border_base};
  transition-duration: 0.001s !important;

  ${props =>
    props.visible &&
    css`
      visibility: visible;
    `}

  a {
    font-size: 1.2rem;
    padding: 0.2rem 0 0.2rem 1.5rem;
    margin-bottom: 0.5rem;
    list-style-type: none;
    color: ${props => props.theme.colors.text};
    cursor: pointer;
    text-decoration: none;
    border-radius: 3px;

    transition-duration: 0.001s !important;

    &:hover {
      background-color: ${props => props.theme.colors.menu_active_bg};
    }
  }

  @media (min-width: 1100px) {
    visibility: visible;
  }
`

export const Title = styled.strong`
  font-size: 1.35rem;
  margin: 1rem 0;
  color: ${props => props.theme.colors.legend_text};
`

export const MenuItem = styled.strong<MenuItemProps>`
  font-weight: 300;
  font-size: 1.35rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;

  /* &:hover {
    font-weight: 900;
  } */

  ${props =>
    props.route === props.path
      ? css`
          color: ${props => props.theme.colors.secundary};
          font-weight: 900;
        `
      : null}
`

export const SubMenuItem = styled.strong<MenuItemProps>`
  font-weight: 500;
  color: pink;
  color: ${props => props.theme.colors.label_disabled};
  margin-left: 3rem;
  font-size: 1.35rem;
  cursor: default;

  /* &:hover {
    font-weight: 900;
  } */

  ${props =>
    props.route === props.path
      ? css`
          color: ${props => props.theme.colors.secundary};
          font-weight: 900;
        `
      : null}
`
