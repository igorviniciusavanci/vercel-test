import styled, { css } from 'styled-components'

interface LogOutProps {
  visible: boolean
}

interface ButtonProps {
  active?: boolean
}

interface HeaderProps {
  back?: boolean
}

export const FixedContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 13.6vh;
  z-index: 999;
`

export const Container = styled.header<HeaderProps>`
  padding: 2rem 3rem;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border_base};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 999;
  /* position: fixed; */

  ${props =>
    props.back &&
    css`
      padding-bottom: 0.5rem;
    `}
`

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
`

export const HeaderContainer = styled.div`
  div {
    display: flex;
    align-items: center;

    strong {
      margin-left: 2rem;
      align-self: flex-end;
      color: ${props => props.theme.colors.secundary};

      @media (max-width: 800px) {
        font-size: 1.2rem;
      }
    }
  }
`

export const ButtonBack = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding-left: 1rem;

  svg {
    color: ${props => props.theme.colors.text};
  }

  span {
    margin-left: 1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }

  @media (min-width: 1100px) {
    padding-left: 0;
  }
`

export const HeaderButtonMenu = styled.button`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: 0;
  outline: 0;
  background: ${props => props.theme.colors.background};
  margin-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 1s;

  &:hover {
    background: ${props => props.theme.colors.input_background};
  }

  @media (min-width: 1100px) {
    display: none;
  }
`

export const HeaderButtonProfile = styled.button<ButtonProps>`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: 0;
  outline: 0;
  background: ${props => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 1s;

  svg {
    color: #909090;
    ${props =>
      props.active &&
      css`
        color: ${props => props.theme.colors.secundary};
      `}
  }
`

export const ImageLogo = styled.img`
  height: 3.5rem;
`

export const Spacer = styled.div`
  padding: 0 1rem;
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.text};
  }
`

export const SignIn = styled.div`
  height: 3.5rem;
  width: 12rem;
  border-radius: 20px;
  border: 1px solid #cdcdcd;
  outline: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 1s;
`

export const LogOut = styled.div<LogOutProps>`
  display: none;
  min-width: 22rem;
  min-height: 15rem;
  border-radius: 8px;
  background: ${props => props.theme.colors.card_user_background};
  position: absolute;
  top: 8rem;
  right: 3rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);

  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .footer {
    display: flex;
    /* margin: 1rem; */
    justify-content: center;
    align-items: center;
    border: 0.5px solid ${props => props.theme.colors.card_user_border};
  }

  ${props =>
    props.visible &&
    css`
      display: block;
    `}

  &::before {
    content: '';
    border-style: solid;
    border-color: ${props => props.theme.colors.card_user_background}
      transparent;
    /* border-width: 6px 6px 0px 6px; */
    border-width: 0px 6px 6px 6px;
    position: absolute;
    top: -6px;
    right: 15px;
    /* right: 50%; */
    /* transform: translateX(-50%); */
  }
`

export const UserData = styled.div`
  /* height: 65%; */
  padding: 2rem 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.card_user_border};

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .user {
    font-size: 1.8rem;
  }

  strong {
    font-weight: 400;
    font-size: 1.4rem;

    & + strong {
      margin-top: 0.5rem;
    }
  }
`

export const ButtonLogOut = styled.button`
  background: transparent;
  /* margin-top: 2rem; */
  margin: 1rem;
  border: 0;
  color: ${props => props.theme.colors.red};
  font-weight: 600;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  & + button {
    margin-bottom: 2rem;
  }

  svg {
    margin-right: 1rem;
  }
`

export const ButtonChangePass = styled.button`
  background: transparent;
  padding: 1rem;
  border: 0;
  color: ${props => props.theme.colors.secundary};
  border-top: 1px solid ${props => props.theme.colors.card_user_border};
  font-weight: 600;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 1rem;
  }
`

export const ContainerTheme = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 0;

  strong {
    margin-right: 1rem;
    ${props => props.theme.colors.text};
  }
`
