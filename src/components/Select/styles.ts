import styled, { css } from 'styled-components'
import Select from 'react-select'
import Tooltip from '../Tooltip'

interface SelectProps {
  isErrored: boolean
  disabled?: boolean
}

export const Container = styled.div<SelectProps>`
  display: block;
  margin: 0.3rem;
  min-width: 20rem;

  label: {
    font-size: 1.2rem;
  }

  span {
    color: ${props => props.theme.colors.label_red};
    ${props =>
      props.disabled &&
      css`
        color: ${props => props.theme.colors.label_disabled};
      `}
  }

  .header {
    display: flex;
    justify-content: space-between;
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

  /* display: flex;
  flex: 1;
  flex-direction: column;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  border-color: lightgray; */

  /* div {
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    height: 40px; */
`

export const SelectContainer = styled(Select)`
  > div {
    width: 100%;
    margin-top: 0.8rem;
    margin-bottom: 2rem;
    border-radius: 0.8rem;
    background: ${props => props.theme.colors.input_background};
    border: 1px solid ${props => props.theme.colors.line_in_white};
    outline: 0;
    padding: 0 0.6rem;
    font-size: 4.1rem;
  }

  input {
    height: 4.1rem;
    color: ${props => props.theme.colors.text} !important;
  }

  /* display: flex; */
  /* padding-left: 10px;
    padding-right: 10px; */
  /* height: 40px; */
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

export const Info = styled(Tooltip)`
  padding: 0 5px;
  /* margin-right: 5rem; */
  span {
    background-color: #bfe5ff;
    color: #006bb2;
    &::before {
      border-color: #bfe5ff transparent;
    }
  }
`
