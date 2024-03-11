import styled, { css } from 'styled-components'
import Tooltip from '../Tooltip'
// import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
  disabled?: boolean
}

export const Container = styled.div<ContainerProps>`
  display: block;
  margin: 0.3rem;

  span {
    color: ${props => props.theme.colors.label_red};
    ${props =>
      props.disabled &&
      css`
        color: ${props => props.theme.colors.label_disabled};
      `}
  }

  > div {
    display: flex;
    justify-content: space-between;
  }

  input {
    width: 100%;
    height: 5.6rem;
    border-radius: 0.8rem;
    padding: 0 1.6rem;
    margin-top: 0.8rem;
    margin-bottom: 1.7rem;
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.input_background};
    border: 1px solid ${props => props.theme.colors.line_in_white};
    outline: 0;

    /* font: 1.6rem Nunito; */
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
  svg {
    color: ${props => props.theme.colors.label_red};
  }

  span {
    background-color: #ffcdd2;
    color: #d50000;
    &::before {
      border-color: #ffcdd2 transparent;
    }
  }
`
