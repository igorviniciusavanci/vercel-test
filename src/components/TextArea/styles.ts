import styled, { css } from 'styled-components'
import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
  disabled?: boolean
}

export const Container = styled.div<ContainerProps>`
  display: block;
  margin: 0.3rem;

  label: {
    font-size: 1.2rem;
  }

  span {
    color: red;
    ${props =>
      props.disabled &&
      css`
        color: #c4c4c4;
      `}
  }

  > div {
    display: flex;
    justify-content: space-between;
  }

  textarea {
    width: 100%;
    height: 11.2rem;
    border-radius: 0.8rem;
    padding: 0 1.6rem;
    margin-top: 0.8rem;
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.input_background};
    border: 1px solid ${props => props.theme.colors.line_in_white};
    outline: 0;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${props => props.theme.colors.label_red};
    `}
  label {
    height: 2rem;
    color: ${props => props.theme.colors.label};
    ${props =>
      props.isErrored &&
      css`
        color: ${props => props.theme.colors.label_red};
      `}
    ${props =>
      props.disabled &&
      css`
        color: ${props => props.theme.colors.label_disabled};
      `}
  }
`

export const Error = styled(Tooltip)`
  padding: 0 5px;
  span {
    background-color: #ffcdd2;
    color: #d50000;
    &::before {
      border-color: #ffcdd2 transparent;
    }
  }
`
