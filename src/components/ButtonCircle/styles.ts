import styled, { css } from 'styled-components'

interface ButtonProps {
  secundary?: boolean
}

export const Button = styled.button<ButtonProps>`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  border: 0;
  outline: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 1s;

  svg {
    color: ${props => props.theme.colors.secundary};
  }

  &:hover {
    background-color: ${props => props.theme.colors.background_filter};
  }

  & + button {
    margin-left: 1rem;
  }
`
