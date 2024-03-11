import styled, { css } from 'styled-components'

interface ButtonProps {
  secundary?: boolean
  remove?: boolean
}

export const Container = styled.label`
  border: 1px solid ${props => props.theme.colors.secundary};
  background-color: ${props => props.theme.colors.secundary};
  border-radius: 4px;
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    color: ${props => props.theme.colors.primary};
  }
  input {
    display: none;
  }
`
