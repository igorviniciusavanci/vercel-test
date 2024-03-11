import styled, { css } from 'styled-components'

interface ButtonProps {
  secundary?: boolean
  remove?: boolean
}

export const Container = styled.button<ButtonProps>`
  width: 100%;
  height: 5.6rem;
  margin-top: 0.8rem;
  border-radius: 0.8rem;
  background: ${props => props.theme.colors.secundary};
  border: 0;
  outline: 0;
  padding: 0 1.6rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 1s;
  max-width: 30rem;

  /* font: 700 1.8rem Nunito; */
  color: #fff;

  &:hover {
  }

  ${props =>
    props.remove &&
    css`
      background: #ff2727;
      &:hover {
      }
    `}
`
