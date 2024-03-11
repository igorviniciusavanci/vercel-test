import styled, { css } from 'styled-components'

interface ButtonProps {
  secundary?: boolean
  remove?: boolean
}
export const Container = styled.label`
  margin-left: 0.2rem;
  border: 1px solid ${props => props.theme.colors.line_in_white};
  background: ${props => props.theme.colors.input_background};
  border-radius: 4px;
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 1s;

  svg {
    color: ${props => props.theme.colors.primary};
  }
  input {
    display: none;
  }
  &:hover {
    background-color: ${props => props.theme.colors.secundary};
  }
`
